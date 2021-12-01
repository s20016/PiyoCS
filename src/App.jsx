import React from 'react'
import './App.css';
import Select from 'react-select';

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            langs: ["all"],
            stmts: [],
            data: {},
            lang: "all",
            stmt: "",
            options: []
        }

    }

    componentDidMount() {
        this.loadLangs('http://133.242.158.143:8000/api/langs')
        this.loadOptions('http://133.242.158.143:8000/api/stmts')
    }

    async loadData(url){
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({data: res}))
    }

    async loadLangs(url) {
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((res) => this.setState({langs: this.state.langs.concat(res)}))
    }

    async loadOptions(url) {
        console.log(url)
        return fetch(url)
            .then((res) => res.json())
            .then((res) => {
                var options = []
                res.forEach(i => {
                    console.log(i)
                    options.push({value: i, label: i})
                })
                this.setState({options: options})
            })
    }

    handleSelectInputChange(e) {
        if (e.length() === 0) {}
        else {
            const val = e[0]["value"]
            this.setState({stmt: val})
        }
    }

    handleSelectChange(e) {
        this.setState({lang: e.target.value})
    }

    handleSerchClick() {
        this.loadData(`http://133.242.158.143:8000/api?lang=${this.state.lang}&stmt=${this.state.stmt}`)
    }

    render(){
        return(
            <div>
                <div>
                    <select onChange={this.handleSelectChange.bind(this)}>
                        <ViewOption langs={this.state.langs}/>
                    </select>
                </div>
                <div>
                    <Select
                        id={"select"}
                        defaultValue={null}
                        isMulti
                        name="colors"
                        options={this.state.options}
                        onChange={this.handleSelectInputChange.bind(this)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    <button onClick={this.handleSerchClick.bind(this)}>
                        serch
                    </button>
                </div>
                <div>
                    {`http://133.242.158.143:8000/api?lang=${this.state.lang}&stmt=${this.state.stmt}`}
                </div>
                <div>
                    code:<pre> {this.state.data.code}</pre>
                    result:<pre> {this.state.data.result}</pre>
                    sample:<pre> {this.state.data.sample}</pre>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

const ViewOption = (props) => {
    return props.langs.map(data => {
        return <option value={data} >{data}</option>
    })
}


export default App;
