import React from 'react'
import Select from 'react-select'
import getdata from '../data/data.json'
import Content from './Content'
import InitialContent from './InitialContent'
import { IoSearch } from 'react-icons/io5'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allData: {},
      langs: [],
      stmts: [],
      data: {},
      lang: '',
      stmt: '',
      selectLang: '',
      selectStmt: '',
      langOptions: [],
      stmtOptions: [],
      selectStmtOption: null,
      selectStmtDisabled: true,
      isInitial: true,
      searchBtnDisabled: true,
      play: true
    }
  }

  componentDidMount () {
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
    const value = e.value
    this.setState({
      selectStmt: value,
      selectStmtOption: { value: value, label: value },
      searchBtnDisabled: false
    })
  }

  handleSelectChange (e) {
    const value = e.value
    const options = []
    Object.keys(this.state.allData[value].statement).forEach(i => {
      options.push({ value: i, label: i })
    })
    this.setState({
      selectStmtDisabled: false,
      searchBtnDisabled: true,
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
  }

  render () {
    return (
      <>
        <div className='search-wrapper'>
          <div className='language-box'>
            <Select
              className='language-select'
              options={this.state.langOptions}
              onChange={this.handleSelectChange.bind(this)}
              placeholder={<div>言語</div>}
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
            isDisabled={this.state.selectStmtDisabled}
            placeholder={<div>文法</div>}
            />
          </div>
          <div className='button-box'>
            <button
              aria-label='search'
              disabled={this.state.searchBtnDisabled}
              className='button'
              onClick={
                this.handleSearchClick.bind(this)
              }
            >
              <IoSearch />
            </button>
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
