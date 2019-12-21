import React,{Component,Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import axios from 'axios'
import ChatMain from "./ChatMain";
class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      movie:[]
    }
  }
  componentDidMount() {
    var _this=this;
    axios.get('http://localhost:3355/released')
        .then(function (response) {
       _this.setState({movie:response.data})
    })
    $('div#chat').toggleClass('active');
    var $win = $(window);
    var top = $(window).scrollTop(); // 현재 스크롤바의위치값을 반환합니다.

    /*사용자 설정 값 시작*/
    var speed          = 1000;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
    var easing         = 'linear'; // 따라다니는 방법 기본 두가지 linear, swing
    var $layer         = $('div#chat_container'); // 레이어셀렉팅
    var layerTopOffset = 0;   // 레이어 높이 상한선, 단위:px
    $layer.css('position', 'absolute');
    /*사용자 설정 값 끝*/

    // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
    if (top > 0 )
      $win.scrollTop(layerTopOffset+top);
    else
      $win.scrollTop(0);

    //스크롤이벤트가 발생하면
    $(window).scroll(function(){

      var yPosition = $win.scrollTop()+300;
      if (yPosition< 0)
      {
        yPosition = $win.scrollTop()+300;
      }
      $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
    });

  }
  render() {
    const html=this.state.movie.map((m)=>
        <div className="col-md-3">
          <div className="thumbnail">
              <img src={m.poster} alt="Nature" style={{"width":"250px","height":"300px"}}/>
                <div className="caption">
                  <p>{m.title}</p>
                </div>
          </div>
        </div>
    )
    return (
        <Fragment>
        <div className={"row"}>
          {html}
        </div>
          <ChatMain/>
        </Fragment>
    )
  }
}
export default App;
