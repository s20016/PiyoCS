import React from 'react';
import ReactPlayer from 'react-player';
import { IoAddCircleSharp,
  IoPlayCircleSharp,
  IoTrashSharp,
  IoAlbumsSharp,
  IoVideocam} from 'react-icons/io5';

class Music extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      musicCount: 0,
      playList: [],
      templateUrl: 'https://www.youtube.com/watch?v=',
      playUrl: '',
      valueOfInputUrl: '',
      isPlaying: false
    }
  }

  componentDidMount () {
    this.setState({
      playList: JSON.parse(localStorage.getItem('musicData')) || []
    })
  }

  onEnd () {
    console.log('end')
    let musicCount = this.state.musicCount + 1
    if (musicCount === this.state.playList.length) { musicCount = 0 }
    this.setState({ playUrl: this.state.templateUrl + this.state.playList[musicCount], musicCount: musicCount })
  }

  onChangeInputUrl (event) {
    const url = event.target.value
    this.setState({ valueOfInputUrl: url })
  }

  onClickAdd () {
    const url = this.state.valueOfInputUrl
    const musicData = JSON.parse(localStorage.getItem('musicData')) || []
    if (url.indexOf('youtu') !== -1) {
      if (url.indexOf('youtube.com') !== -1) {
        const fcount = url.indexOf('watch?v=') + 8
        const lcount = url.indexOf('&')
        const slicedUrl = (lcount !== -1)? url.slice(fcount, lcount): url.slice(fcount)
        musicData.push(slicedUrl)
        localStorage.setItem('musicData', JSON.stringify(musicData))
        this.setState({
          valueOfInputUrl: '',
          playList: musicData
        })
      } else if (url.indexOf('youtu.be') !== -1) {
        const fcount = url.indexOf('youtu.be') + 9
        const slicedUrl = url.slice(fcount)
        musicData.push(slicedUrl)
        localStorage.setItem('musicData', JSON.stringify(musicData))
        this.setState({
          valueOfInputUrl: '',
          playList: musicData
        })
      }
    }
  }

  onStart () {
    this.setState({
      playUrl: this.state.templateUrl + this.state.playList[this.state.musicCount],
      isPlaying: true
    })
  }

  onClickPlay (number) {
    this.setState({
      musicCount: number,
      playUrl: this.state.templateUrl + this.state.playList[number],
      isPlaying: true
    })
  }

  onClickDelete (number) {
    const playList = this.state.playList
    playList.splice(number, 1)
    localStorage.setItem('musicData', JSON.stringify(playList))
    this.setState({ playList: playList })
  }

  render () {
    return (
      <div className='music-player'>
        {
          (this.state.isPlaying)
            ? <ReactPlayer
                className='player'
                width='350px'
                url={this.state.playUrl}
                playing={true}
                onEnded={() => { this.onEnd() }}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 1
                    }
                  }
                }}
              />
            : <div className='no-player'><IoVideocam /></div>
        }
        <div className='search'> 
          <p>ここに好きな音楽のYoutube-URLを入れてください</p>
          <div className='bar'>
            <input
              type='text'
              onChange={event => { this.onChangeInputUrl(event) }} 
              value={this.state.valueOfInputUrl}
            />
            <button onClick={() => { this.onClickAdd() }}><IoAddCircleSharp/></button>
            <button onClick={() => { this.onStart() }}><IoPlayCircleSharp/></button>
          </div>
        </div>
        <div className="playlist">
          <ViewMusicList
            musicList={this.state.playList}
            onClickPlay={this.onClickPlay.bind(this)}
            onClickDelete={this.onClickDelete.bind(this)}
          />
        </div>
      </div>
    )
  }
}

const ViewMusicList = (props) => {
  const tempUrl = 'https://i.ytimg.com/vi/'
  if (props.musicList.length === 0) return (
    <div className='empty-list'>
      <IoAlbumsSharp />
      <p>プレイリストはありません</p>
    </div>
  )
  return (
    props.musicList.map((v, i) => {
      return (
        <div className='list' key={v}>
          <img
            src={tempUrl + v + '/hqdefault.jpg'}
            alt="Youtube Video" 
          />
          <div className='options'>
            <button onClick={() => { props.onClickPlay(i) }}><IoPlayCircleSharp/></button>
            <button onClick={() => { props.onClickDelete(i) }}><IoTrashSharp/></button>
          </div>
        </div>
      )
    })
  )
}

export default Music
