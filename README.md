# browser101-lecture

//브라우저101 강의 수강과 관련한 자바스크립트 실습코드

*강의주제: 프론트엔드 개발자라면 필수로 알아야 하는 브라우저와 Web APIs 그리고 자바스크립트 마스트 | 디버깅, 퍼포먼스 분석, 10개의 실전 프로젝트

*빠른 실습용도로 html 한 파일 내에서 코드 기재하는 부분이 있으니 참조

1) Web API
window라는 global object 안에는
DOM/ BOM/ JavaScript Object 3개의 object Model로 구분지어짐


2) 브라우저 Render시 순서 (Critical rendering path)
construction(DOM - CSSOM - RenderTree) -> operation (layout - painting - compsition)

* 화면이 변할 때 layout부터 다시 일어난다면 성능에 좋지않음 
- https://csstriggers.com/ 참고



