
class GeneralSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canSave: true,
      hasEndDate: false, // temporary, this should be on promotion json
      selectedEffect: null, // oneOf ['price', 'gift', 'shipping', 'reward']
      allCustomersElligible: true ,
    }
  }

  static contextTypes = {
    navigate: PropTypes.func,
  }

  static propTypes = {
    intl: intlShape,
  }

  componentDidMount = () => {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  selectEffect = effect => {
    this.setState({ selectedEffect: effect })
  }

  isEffectSelected = effect => this.state.selectedEffect === effect

  render() {
    const { hasEndDate } = this.state
    const { intl } = this.props

    return (
        <PageBlock>
          <h4 className="t-heading-4 mt0">
            <FormattedMessage id="promotions.promotion.info.title" />
          </h4>
          <Input label={intl.formatMessage({ id: "promotions.promotion.info.name" })} />
          <div className="mv4">
            <DatePicker
              locale={intl.locale}
              onChange={() => {}}
              value={new Date()}
              label={intl.formatMessage({ id: "promotions.promotion.info.startDate" })} />
          </div>
          <Checkbox
            checked={hasEndDate}
            label={intl.formatMessage({ id: "promotions.promotion.info.endDateCheck" })}
            onChange={e => this.setState({ hasEndDate: !hasEndDate })}
          />
          {hasEndDate
            ? <div className="mt4">
                <DatePicker
                  locale={intl.locale}
                  onChange={() => {}}
                  value={new Date() + 7 * 24 * 60 * 60 * 1000}
                  label={intl.formatMessage({ id: "promotions.promotion.info.startDate" })} />
              </div>
            : null
          }
        </PageBlock>
    )
  }
}

export default GeneralSection
