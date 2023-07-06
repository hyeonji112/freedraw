// 스크롤 버튼을 표시하거나 숨기는 함수
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("scrollBtn").style.display = "block";
    } else {
        document.getElementById("scrollBtn").style.display = "none";
    }
}

// 페이지 하단으로 스크롤하는 함수 (바운싱 애니메이션 포함)
function scrollToBottom() {
    var currentPosition = document.documentElement.scrollTop;
    var targetPosition = document.documentElement.scrollHeight - window.innerHeight;
    var distance = targetPosition - currentPosition;
    var duration = 300; // 애니메이션 지속 시간 (밀리초)
    var start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var percentage = Math.min(progress / duration, 1);
        var easing = easeOutQuad(percentage);
        window.scrollTo(0, currentPosition + (distance * easing));

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// 이징 함수 (쿼드 이징 사용)
function easeOutQuad(t) {
    return t * (2 - t);
}

// 메뉴 버튼 클릭 이벤트 핸들러
document.getElementById("menuBtn").addEventListener("click", function() {
  var menuContent = document.getElementById("menuContent");
  menuContent.classList.toggle("show");

  if (menuContent.classList.contains("show")) {
      menuContent.style.animation = "slideIn 0.3s forwards";
  } else {
      menuContent.style.animation = "slideOut 0.3s forwards"; // 슬라이드 애니메이션 추가
  }
});

  // 메뉴 창 외부를 클릭하면 메뉴 창 닫기
window.addEventListener("click", function(event) {
    var menuWrapper = document.getElementById("menuWrapper");
    if (!menuWrapper.contains(event.target)) {
        var menuContent = document.getElementById("menuContent");
        menuContent.classList.remove("show");
        menuContent.style.animation = "slideOut 0.3s forwards"; // 슬라이드 애니메이션 추가
    }
});


  
// 달력
// script.js

var sliderContainer = document.querySelector('.slider-container');
var slider = document.querySelector('.slider');
var currentIndex = 0; // 현재 이미지 인덱스

// 이미지 전환 함수
function goToNextImage() {
  currentIndex = (currentIndex + 1) % totalImages;
  slider.style.transform = 'translateX(' + (-7.1429 * currentIndex) + '%)';
  updateIndicator(); // 인디케이터 업데이트
}

// 이미지 클릭 이벤트에 goToNextImage 함수 연결
var images = document.querySelectorAll('.slider img');
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener('click', goToNextImage);
}

// 전체 이미지 개수 가져오기
var totalImages = images.length;

// 인디케이터 업데이트 함수
function updateIndicator() {
  var indicatorContainer = document.querySelector('.indicator-container');
  
  // 기존 인디케이터 점 삭제
  while (indicatorContainer.firstChild) {
    indicatorContainer.firstChild.remove();
  }
  
  // 현재 이미지 위치에 해당하는 인디케이터 점 추가
  for (var i = 0; i < totalImages; i++) {
    var dot = document.createElement('span');
    dot.classList.add('indicator-dot');
    if (i === currentIndex) {
      dot.classList.add('active');
    }
    indicatorContainer.appendChild(dot);
  }
}

// 인디케이터 컨테이너 생성
var indicatorContainer = document.createElement('div');
indicatorContainer.classList.add('indicator-container');
sliderContainer.appendChild(indicatorContainer);

// 초기 인디케이터 업데이트
updateIndicator();

