import axios from "axios";

const storages = {
  prices: "prices",
  campaign: "campaign",
  pages: "pages"
};

const statementTypes = ["bin", "name"]
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
  }
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

      // TODO create validateSubject function
      const containsInvalidSubject = statementDefinitions.some(statementDefinition => {
          return statementTypes.indexOf(statementDefinition.subject) === -1
      })

      if (containsInvalidSubject) {
        throw new Error(`Invalid statement subject`)
      }

      const expression = statementDefinitions.reduce((currentExpression = "", statementDefinition, index) => {
        return `${currentExpression}${(index === 0 ? "" : conjunction )}${transpilers[statementDefinition.subject](statementDefinition)}`
      }, "")
      
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
