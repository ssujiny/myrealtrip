//nav 활성화를 위한 click, scroll 이벤트 설정
const $menus = document.querySelectorAll('header nav a');
const $footer = document.querySelector('footer');

const footerTop = $footer.offsetTop;
const arrTopSec = [];

//section별 top값 -> 배열 arrTopSec에 저장
document.querySelectorAll('section').forEach(($section, idx)=>{
  arrTopSec[idx] = $section.offsetTop;
});

console.log(arrTopSec);

//메뉴 클릭 이벤트 구문(스크롤 변화 및 메뉴 활성화)
$menus.forEach(($menu, idx)=>{
  $menu.addEventListener('click', (evt)=>{
    evt.preventDefault();
    window.scrollTo({
      top: arrTopSec[idx]-170,//header 높이 차감
      behavior: "smooth"
    });
  });
});

//스크롤 이벤트에 따른 메뉴 활성화
(function(){
  let nowIdx = 0;
  let oldIdx = nowIdx;

  window.addEventListener('scroll', ()=>{
    //현재 스크롤 위치 변수 저장
    const scrollTop = Math.ceil(window.scrollY);

    //메뉴별 top 경계선 진입시 활성화 - 반복 for문
    for(let i=0; i<$menus.length; i++){
      if(scrollTop >= arrTopSec[i]-170){
        oldIdx = nowIdx;
        nowIdx = i;

        $menus[oldIdx].parentElement.classList.remove('on');
        $menus[nowIdx].parentElement.classList.add('on');
      }
    }
    //푸터 영역 진입시 모든 메뉴 활성화 삭제
    if(scrollTop >= footerTop-170){
      $menus[6].parentElement.removeAttribute('class');
    }
  })
})();


//top 버튼
const $up = document.querySelector('aside>a');
const $logo = document.querySelector('header h1>a');

$up.addEventListener('click', (evt)=>{
  evt.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

//로고 클릭시 동일 움직임
$logo.addEventListener('click', (evt)=>{
  evt.preventDefault();
  $up.click();
});



//main 돔 선언
//section-thema-place
const $places = document.querySelector('.places');
const $placeprev = document.querySelector('.placeprev'); 
const $placenext = document.querySelector('.placenext'); 

//sectione-thema-event
const $slideEvent = document.querySelector('.thema-slides-event');
const $events = document.querySelector('.events');
const $evtPrev = document.querySelector('.evtprev');
const $evtNext = document.querySelector('.evtnext');
const $dots = document.querySelectorAll('.dots>li');

//section.hotplace
const $hots = document.querySelector('.hots');
const $hotPrev = document.querySelector('.hotprev');
const $hotNext = document.querySelector('.hotnext');

//section.ticket
const $tickets = document.querySelector('.tickets');
const $ticketPrev = document.querySelector('.ticketprev');
const $ticketNext = document.querySelector('.ticketnext');

//section.jejutraffic
const $traffics = document.querySelector('.traffics');
const $trafficPrev = document.querySelector('.trafficprev');
const $trafficNext = document.querySelector('.trafficnext');


//section-thema-place
(function(){
  let nowIdx = 0;
  let oldIdx = nowIdx; 
  
  
  $placenext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    if(nowIdx < 1 ){nowIdx++;}
    if(nowIdx === 1){
      $placenext.style.display = 'none';
      $placeprev.style.display = 'block'
    }
    //사진 이동
    $places.style.left = (-1080 * nowIdx) +'px';
  });
  
  $placeprev.addEventListener('click', (evt)=>{
    evt.preventDefault();
    if(nowIdx > 0){nowIdx--;}
    if(nowIdx === 0){
      $placeprev.style.display = 'none';
      $placenext.style.display = 'block';
    }
    //사진 이동
    $places.style.left = (-1080 * nowIdx) +'px';
  });

})();

////////////////////////////////////////////////////.end_thema-slides-place

//sectione-thema-event
(function(){
  let nowIdx = 0 
  let oldIdx = nowIdx; 
  
  //다음버튼
  $evtNext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    oldIdx = nowIdx; 
    if(nowIdx<9){nowIdx++;}
    if(nowIdx>0){$evtPrev.style.display = 'block';}
    if(nowIdx===9){$evtNext.style.display = 'none';}
    
    //사진 이동
    $events.style.left = (-1080 * nowIdx) + 'px';
    //페이지 동그라미 활성화
    $dots[nowIdx].classList.add('doton');
    $dots[oldIdx].classList.remove('doton');
  });

  //이전버튼
  $evtPrev.addEventListener('click', (evt)=>{
    evt.preventDefault();
    oldIdx = nowIdx; 
    if(nowIdx>0){nowIdx--;}
    if(nowIdx<=8){$evtNext.style.display = 'block';}
    if(nowIdx===0){$evtPrev.style.display = 'none';}
    //사진 이동
    $events.style.left = (-1080 * nowIdx) + 'px';
    //페이지 동그라미 활성화
    $dots[nowIdx].classList.add('doton');
    $dots[oldIdx].classList.remove('doton');
  });

  //hover시 버튼 나타나게 효과(a영역에서도 hover 인식 위해서 $slideEvent 돔 선택)
  $slideEvent.addEventListener('mouseout', ()=>{
    $evtNext.style.display = 'none';
    $evtPrev.style.display = 'none';
  });

  $slideEvent.addEventListener('mouseover', ()=>{
    if(nowIdx===0){
      //1번째 이미지에서는 이전버튼 display:none처리
      $evtPrev.style.display = 'none';
      $evtNext.style.display = 'block';
    }else if(nowIdx===9){  
      //마지막 이미지에서는 다음버튼 display:none처리
      $evtPrev.style.display = 'block';
      $evtNext.style.display = 'none';
    }else{
      $evtNext.style.display = 'block';
      $evtPrev.style.display = 'block';
    }
  });
})();

////////////////////////////////////////////////////////////end _thema-slides-event

//section.hotplace
(function(){
  let nowIdx = 0;
  let oldIdx = nowIdx;
  
  //다음버튼
  $hotNext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    
    $hotPrev.style.display = 'block'

    if(nowIdx < 6 ){
      nowIdx++;
      $hots.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 6){
      $hotNext.style.display = 'none';
      $hots.style.left = (-1080 * 5 - 270) +'px';
    }
  });
  //이전버튼
  $hotPrev.addEventListener('click', (evt)=>{
    evt.preventDefault();
  
    $hotNext.style.display = 'block';
    if(nowIdx > 0){
      nowIdx--;
      $hots.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 0){
      $hotPrev.style.display = 'none';
      //사진 이동
      $hots.style.left = (-1080 * nowIdx) +'px';
    }
  });
})();

//////////////////////////////////////////////////////////section.hotplace 완료!!!

//section.ticket
(function(){
  let nowIdx = 0;
  let oldIdx = nowIdx;
  
  
  $ticketNext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    
    $ticketPrev.style.display = 'block';

    if(nowIdx < 2 ){
      nowIdx++;
      $tickets.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 2){
      $ticketNext.style.display = 'none';
      $tickets.style.left = (-1080 * nowIdx) +'px';
    }
  });
  
  $ticketPrev.addEventListener('click', (evt)=>{
    evt.preventDefault();
  
    $ticketNext.style.display = 'block';

    if(nowIdx > 0){
      nowIdx--;
      //사진 이동
      $tickets.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 0){
      $ticketPrev.style.display = 'none';
      $tickets.style.left = (-1080 * nowIdx) +'px';
    }
  });

})();

/////////////////////////////////////////////////////////////////////////.ticket 완료!!!

//section.jejutraffic
(function(){
  let nowIdx = 0;
  let oldIdx = nowIdx;
  
  
  $trafficNext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    
    $trafficPrev.style.display = 'block'

    if(nowIdx < 4 ){
      nowIdx++;
      $traffics.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 4){
      $trafficNext.style.display = 'none';
      $traffics.style.left = (-1080 * 3 - 540) +'px';
    }
  });
  
  $trafficPrev.addEventListener('click', (evt)=>{
    evt.preventDefault();

    $trafficNext.style.display = 'block';

    if(nowIdx > 0){
      nowIdx--;
      $traffics.style.left = (-1080 * nowIdx) +'px';
    }
    if(nowIdx === 0){
      $trafficPrev.style.display = 'none';
      $traffics.style.left = (-1080 * nowIdx) +'px';
    }
  });
})();
//////////////////////////////////////////////////////section.jejutraffic 완료