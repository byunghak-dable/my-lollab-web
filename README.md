# webcomponent-client

1.  앱(패키지) 구성 및 설명

    (1) 폴더 구성

        public - 앱이 동작하는데 필요한 파일(번들링 시 dist 폴더로 옮겨짐)
        src - 소스 폴더
            app - 프로젝트 동작 코드 모음
                component - 웹 컴포넌트(LitElement) 모음
                controller - Lit 라이브러리에서 제공하는 컨트롤러 모음
                mixin
                model
                style
                util
                index.html
            assets - 이미지, 영상 등의 asset 모음
            core - 웹 컴포넌트 앱이 동작하는 데 필수적으로 필요한 파일 모음

    (2) 앱 구성

        1) 클라이언트 동작 방식 : Single Page Application
        2) 모바일 지원 : PWA 기술 적용 예정 => 모바일 친화적으로 디자인 필수
        3) 라이브러리

            <1> dependencies(앱 동작)
                - lit
                - firebase

            <2> devDependencies(번들링)
                - webpack
                - webpack plugin(웹팩 플러그인 및 로더들)

2.  WebComponent

    (1) webComponent

        1) Custom elements - 커스텀으로 테그를 만들 수 있다.
        2) Shadow DOM - 메인 다큐먼트 DOM 으로부터 독립적으로 랜더링되는 캡슐화된 DOM -> 외부 css에 영향 X
        3) HTML tag - template, slot
        4) css - :defined, :host(shadow dom을 감싸고 있는 호스트)
        5) Lifecycle
            - connectedCallback - DOM에 연결되었을 때
            - disconnectedCallback - document의 DOM으로부터 연결 해제됬을 때
            - adoptedCallback - 새로운 document로 이동됬을 때
            - attributeChangedCallback
        6) 참고
            - https://developer.mozilla.org/ko/docs/Web/Web_Components

    (2) LitElement

        1) 원리
            - HTMLElement를 상속받은 클래스로 web-component의 모든 기능을 사용할 수 있다.
            - render, properties : property를 관찰하여 property가 변경되면 필요한 랜더링 작업 수행

            <1> render 메소드 선언 방법

                render() {
                    return html`<div></div>`
                }

            <2> properies 선언 방법

                @property({type:string}) prop = "prop"

        2) Lifecycle
            - someProperty.hasChanged
            - requestUpdate
            - performUpdate
            - shouldUpdate
            - willUpdate
            - update
            - render
            - firstUpdated (처음 랜더링 때만)
            - updated

        3) syntax
            - Text content: <p>${...}</p>
            - Attribute: <p id="${...}"></p>
            - Boolean attribute: ?disabled="${...}"
            - Property: .value="${...}"
                => get properties를 통해 입력 받은 Element에서 관찰 가능
                => web component는 생성자에 값을 전달하지 못하므로 자식 Element의 초기값을 여기서 받는다.
            - Event handler: @(event)="${...}"
                => ex) @click=${function}

        ?) 참고
            - https://lit.dev/docs/

3.  node_module

    (1) 개발 환경 세팅 : ts + webpack

        1) webpack 명령어(번들 만들기 및 테스트 실행 방법)

            <1> 번들 만드는 명령어 : npm run build

                - dist 폴더에 번들 파일들 생성
                - no such file or directory, uv_cwd 에러가 뜨는 경우 -> killall node 명령어(Linux) 입력 후 실행

            <2> 테스트 명령어 : npm run test

                - 테스트 서버 실행, 저장하면 업데이트

        ?) 참고 문서
