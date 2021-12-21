import React from 'react'
import Select from 'react-select'
import getdata from '../data/data.json'
import { IoSearch } from 'react-icons/io5'

import Content from './Content'
import InitialContent from './InitialContent'

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
      selectLang: 'all',
      selectStmt: '',
      langOptions: [],
      stmtOptions: [],
      selectStmtOption: null,
      isInitial: true
    }
  }

  componentDidMount () {
    // this.loadData('https://raw.githubusercontent.com/s20016/PiyoCS/dev/public/data.json')
    this.getData()
  }

  getData () {
    const langsOptions = []
    this.state.langs.concat(Object.keys(getdata)).forEach(i => {
      langsOptions.push({ value: i, label: i })
    })
    const stmtOptions = []
    Object.keys(getdata.python.statement).forEach(i => {
      stmtOptions.push({ value: i, label: i })
    })
    this.setState({
      langOptions: langsOptions,
      stmtOptions: stmtOptions,
      allData: getdata
    })
  }

  handleSelectInputChange (e) {
    console.log(e)
    const value = e.value
    this.setState({ selectStmt: value, selectStmtOption: { value: value, label: value } })
  }

  handleSelectChange (e) {
    console.log(e)
    const value = e.value
    if (value === 'all') {
      return
    }
    const options = []
    Object.keys(this.state.allData[value].statement).forEach(i => {
      options.push({ value: i, label: i })
    })
    this.setState({
      selectLang: e.value,
      selectStmt: '',
      selectStmtOption: null,
      options: options
    })
  }

  handleSearchClick () {
    this.setState({
      data: this.state.allData[this.state.selectLang].statement[this.state.selectStmt],
      stmt: this.state.selectStmt,
      lang: this.state.selectLang,
      isInitial: false
    })
    console.log(this.state.data)
  }

  render () {
    const customStyles = {
      option: (provided) => ({
        ...provided
      })
    }

    return (
      <>
        <div className='search-wrapper'>
          <div className='search-bar'>
            <div className='language-box'>
              <Select
                styles={customStyles}
                className='language-select'
                options={this.state.langOptions}
                onChange={this.handleSelectChange.bind(this)}
              />
            </div>
            <div className='divider'>
            </div>
            <div className='statement-box'>
              <Select
              className='statement-select'
              value={this.state.selectStmtOption}
              options={this.state.options}
              onChange={this.handleSelectInputChange.bind(this)}
              />
            </div>
            <div className='button-box'>
              <button
                className='button'
                onClick={
                  this.handleSearchClick.bind(this)
                }
              >
                <IoSearch />
              </button>
            </div>
          </div>
        </div>
        {
          (this.state.isInitial)
            ? <InitialContent/>
            : <Content
                lang={this.state.lang}
                stmt={this.state.stmt}
                code={this.state.data.code}
                result={this.state.data.result}
                sample={this.state.data.sample}
              />
        }
      </>
    )
  }
}

export default Search
