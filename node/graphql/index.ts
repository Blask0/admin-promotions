import axios from "axios";

const storages = {
  prices: "prices",
  campaign: "campaign",
  pages: "pages"
};

const transpilers = {
  bin: (statementDefinition) => { 
    if( statementDefinition.verb === "between") {
      //TODO remove between, it makes no sense
      return "TODO remove between, it makes no sense"
    }
    const connector = statementDefinition.verb === 'is' ? '==' : '!='
    return `(first (.params[]? | select(.name=="restrictionsBins")) | (.value | tonumber) ${connector} ${statementDefinition.object})`
  },
  name: (statementDefinition) => { 
    return "nameeeee"
  },
  paymentMethod: (statementDefinition) => { 
    if ( statementDefinition.verb === "is" ) {
      return `(first (.params[]? | select(.name == "paymentMethodId")) | (.value | tonumber) == ${statementDefinition.object})`
    }

    if ( statementDefinition.verb === "any-of" ) {
      const paymentMethods = statementDefinition.object || []

      const paymentMethodIds = paymentMethods.map(method => {
        return `"${method.value}"`
      }).join(',')

      return `(first (.params[]? | select(.name == "paymentMethodId")) | .value as $paymentMethodId | any([${paymentMethodIds}]; .[] == $paymentMethodId))`
    }
    
  }
}

const validatePossibleTranspilers = (statementDefinitions, transpilers) => {
      const statementTypes = Object.keys(transpilers)
      const invalidSubjects = []

      const containsInvalidSubject = statementDefinitions.some(statementDefinition => {
        const isInvalid = statementTypes.indexOf(statementDefinition.subject) === -1

        if (isInvalid) {
          invalidSubjects.push(statementDefinition.subject)
        }

        return isInvalid
      })

      if (containsInvalidSubject) {
        return {valid: false, error: new Error(`Invalid subjects: '${invalidSubjects.join(", ")}'`)} 
      }

      return {valid: true, error: null}
}

const transpile = (statementDefinitions, conjunction, transpilers) => {
  return statementDefinitions.reduce((currentExpression, statementDefinition, index) => {
    const statementExpression = transpilers[statementDefinition.subject](statementDefinition)

    if (index === 0) {
      return statementExpression
    }
    
    return `${currentExpression} ${conjunction} ${statementExpression}`
  }, "")
}

export const resolvers = {
  Mutation: {
    translate: async (
      _,
      info,
      { vtex: ioContext, request }
    ) => {
      const statementDefinitions = JSON.parse(info.statementDefinitions)
      const { operator } = info
      const conjunction = (operator === "any") ? " or " : " and "

      const { valid, error } = validatePossibleTranspilers(statementDefinitions, transpilers)
      if (error) {
        throw error
      }
    
      const expression = transpile(statementDefinitions, conjunction, transpilers)

      return expression

    }
  },
  Query: {
    
    getBenefits: async (_, args, { vtex: ioContext }) => {
      // MOCK
      return [
        {
          name: "get-headphone",
          isActive: true,
          campaigns: [{ name: "black-friday" }],
          effectType: "Gift"
        },
        {
          name: "50-percent-off",
          isActive: true,
          campaigns: [],
          effectType: "Price"
        },
        {
          name: "90-percent-off",
          isActive: true,
          campaigns: [{ name: "black-friday" }],
          effectType: "Price"
        },
        {
          name: "free-shipping",
          isActive: false,
          campaigns: [{ name: "black-friday" }],
          effectType: "Shipping"
        }
      ];
    },
    getCampaigns: async (_, info, { vtex: ioContext, request }, query) => {
      let finalResponse = {
        conditionsLimit: 0,
        conditions: [],
        error: undefined
      };

      if (!storages.hasOwnProperty(info.conditionType)) {
        finalResponse.error = `Invalid storage type: "${info.conditionType}"`;
        return finalResponse;
      }

      const conditionsURL = `https://api.vtex.com/${
        ioContext.account
      }/conditions/${info.conditionType}/condition`;

      await axios
        .get(conditionsURL, {
          headers: {
            Authorization: ioContext.authToken
          }
        })
        .then(
          function(response) {
            console.log(
              `Fetched CONDITIONS of type ${info.conditionType} with success`
            );
            console.log(response.data.conditions);
            finalResponse = response.data;
          },
          function(error) {
            console.log(
              `Error fetching conditions of type "${info.conditionType}": ${
                error.response.data
              }`
            );
            console.log(error);
            finalResponse.error = error.response.status;
          }
        );

      return finalResponse;
    }
  }
};
