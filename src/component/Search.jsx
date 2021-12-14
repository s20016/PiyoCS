import React from 'react'
import Select from 'react-select'
import getdata from '../data/data.json'
// import Button from 'react-bootstrap/Button'
import { IoSearch } from 'react-icons/io5'

import Content from './Content'
// import Footer from './Footer'

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
      langOptions: [],
      stmtOptions: [],
      selectStmtOption: null
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

  // async loadData (url) {
  //   console.log(url)
  //   return window.fetch(url)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       const langs = Object.keys(res)
  //       const options = []
  //       Object.keys(res.python.statement).forEach(i => {
  //         options.push({ value: i, label: i })
  //       })
  //       this.setState({
  //         langs: this.state.langs.concat(langs),
  //         options: options,
  //         allData: res
  //       })
  //     })
  // }

  handleSelectInputChange (e) {
    console.log(e)

    // if (e.length === 0) {
    //   this.setState({ stmt: '' })
    //   return
    // }

    const value = e.value
    this.setState({ stmt: value, selectStmtOption: { value: value, label: value } })
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
      lang: e.value,
      stmt: '',
      selectStmtOption: null,
      options: options
    })
  }

  handleSearchClick () {
    this.setState({ data: this.state.allData[this.state.lang].statement[this.state.stmt] })
    console.log(this.state.data)
  }

  render () {
    return (
      <>
        <div className='wrapper'>
          <div className='searchBar'>
            <div className='lang'>
              <Select
                className='dropdown'
                options={this.state.langOptions}
                onChange={this.handleSelectChange.bind(this)}
              />
            </div>
            <div className='divider'>
            </div>
            <div className='stmt'>
              <Select
              // id='select'
              // defaultValue={null}
              // isMulti
              // name='colors'
              className='dd-search'
              value={this.state.selectStmtOption}
              options={this.state.options}
              onChange={this.handleSelectInputChange.bind(this)}
              // classNamePrefix='select'
              />
            </div>
            <div className='btn'>
              <button
                className='sbtn'
                onClick={this.handleSearchClick.bind(this)}
              >
                <IoSearch />
              </button>
            </div>
          </div>
        </div>
        <Content
          lang={this.state.lang}
          stmt={this.state.stmt}
          // code={this.state.data.code}
          result={this.state.data.result}
          sample={this.state.data.sample}
        />
      </>
    )
  }
}

// const ViewOption = (props) => {
//   return props.langs.map(data => {
//     return <option key={data} value={data}>{data}</option>
//   })
// }

export default Search