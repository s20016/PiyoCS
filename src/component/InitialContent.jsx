import React from 'react'

const InitialContent = () => {
  return (
    <>
      <div className='initcont-wrapper'>
        <div className='header-lang'>
          <h2>Welcome to PiyoPiyoCS</h2>
          <h5>ピヨピヨチートシートへようこそ</h5>
        </div>
        <hr className='divider'/>
        <div className="content">
          <p>
            ここでは、各プログラミング言語のチートシートを見ることができます。<br/>
            上の2つの欄をクリックし、言語と見たい文法を選択して検索。<br/>
            <span className='music-disc'><br/>右にある欄にYoutubeの好きな動画のURLを入れてプレイリストを作成できます。<br/>URLを欄に入力。「+」ボタンをクリックで追加完了。「&#9654;」ボタンで再生。</span>
          </p>

          <div className='terms'>
            <h4>利用規約</h4>
            <ul>
              <li>
                このサイトで記述されているプログラムは、一定の開発環境で動作したもので、<span>皆様の環境で動作するかは保証できません。</span>
                また、<span>このサイトで記述されているプログラムを使用してトラブル等が発生しても、PiyoCSの作成者は責任を負いません。</span><br/>
              </li>
              <li>
                このサイトでの音楽の再生はYoutubeの埋め込み動画という形で流しております。Youtubeの埋め込み動画では動画投稿者が埋め込みを許可するか許可しないか判断できます。
                <span>埋め込みが許可されていない動画は視聴することができません。</span><br/>
              </li>
              <li>
                また、Youtubeの埋め込み動画の動画は著作者が著作権を保有しています。
                <span>著作権違反されている動画の再生は著作権違反になります。著作権違反でのトラブル等が発生しても、PiyoCSの作成者は責任を負いません。</span><br/>
              </li>
              <li>
                <span>検索ボタン、音楽追加ボタンを押した時点でこの利用規約に同意したものとします。</span>
              </li>
            </ul>
            <div className="project">
              <p>Graduation Task Project</p>
              <p>Created by s20016, s20022, s20024.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InitialContent
