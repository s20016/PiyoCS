import React from 'react'
import Select from 'react-select'

import Content from './Content'
import Footer from './Footer'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allData: {},
      langs: ['all'],
      stmts: [],
      data: {},
      lang: 'all',
      stmt: '',
      options: []
    }
  }

  componentDidMount () {
    this.loadData('https://raw.githubusercontent.com/s20016/PiyoCS/dev/public/data.json')
  }

  async loadData (url) {
    console.log(url)
    return window.fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const langs = Object.keys(res)
        const options = []
        Object.keys(res.python.statement).forEach(i => {
          options.push({ value: i, label: i })
        })
        this.setState({
          langs: this.state.langs.concat(langs),
          options: options,
          allData: res
        })
      })
  }

  handleSelectInputChange (e) {
    if (e.length === 0) {
      this.setState({ stmt: '' })
      return
    }
    const val = e[0].value
    this.setState({ stmt: val })
  }

  handleSelectChange (e) {
    const value = e.target.value
    if (value === 'all') {
      return
    }
    const options = []
    Object.keys(this.state.allData[value].statement).forEach(i => {
      options.push({ value: i, label: i })
    })
    this.setState({
      lang: e.target.value,
      options: options
    })
  }

  handleSearchClick () {
    this.setState({ data: this.state.allData[this.state.lang].statement[this.state.stmt] })
  }

  render () {
    // console.log(this.state.lang)
    console.log('TEST')
    console.log(this.state.data)
    return (
      <div className='wrapper'>
        <div className='searchBar'>
          <select onChange={this.handleSelectChange.bind(this)}>
            <ViewOption langs={this.state.langs} />
          </select>
        </div>
        <div>
          <Select
            id='select'
            defaultValue={null}
            isMulti
            name='colors'
            options={this.state.options}
            onChange={this.handleSelectInputChange.bind(this)}
            className='basic-multi-select'
            classNamePrefix='select'
          />
          <button onClick={this.handleSearchClick.bind(this)}>
            search
          </button>
        </div>
        <div>
          <Content
            lang={this.state.lang}
            stmt={this.state.stmt}
            code={this.state.data.code}
            result={this.state.data.result}
            sample={this.state.data.sample}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

const ViewOption = (props) => {
  return props.langs.map(data => {
    return <option key={data} value={data}>{data}</option>
  })
}

export default Search
