import React from 'react'

import styled, { keyframes } from 'styled-components'

const float = keyframes`
  50% {
    transform: translate(0, 4px);
}
`

export const Frame = styled.div`
  height: 55px;
  width: 55px;
  animation: ${float} 3s ease-out infinite;
`
const GhostIcon = () => {
  return (
    <Frame>
      <svg version="1.1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs />
        <g id="Layer 1">
          <path
            d="M9.86202+32.8714C12.218+33.289+13.64+34.1305+14.7848+31.9986C16.0788+29.5889+16.0097+25.4261+16.8361+23.2786C19.1674+17.2206+20.5069+15.3745+24.6806+12.686C29.8087+9.38285+33.1811+9.66856+36.3946+9.66856C42.7796+9.66856+45.8253+12.144+47.6704+14.0978C49.6648+16.2097+51.404+19.0407+52.2225+23.9898C53.7098+32.9826+51.3311+33.5586+51.8439+39.2007C52.2176+43.3124+67.5075+50.1038+59.1568+51.3521C49.4467+52.8037+54.0252+61.4087+49.2699+61.3241C43.1821+61.216+43.6939+55.121+39.8752+54.8251C37.139+54.6131+35.1958+63.76+33.5454+63.76C31.5736+63.76+30.4716+54.104+27.9719+53.8008C23.5973+53.2703+24.0546+61.2839+20.7071+60.6493C17.0947+59.9646+18.6521+54.4932+14.6432+54.6884C12.7654+54.7798+14.7066+61.0534+8.10741+56.5149C-3.42582+48.5833+13.7937+44.7829+9.73169+42.1061C6.25447+39.8147+5.58277+32.1129+9.86202+32.8714Z"
            fill="#ffc0cb"
            opacity="1"
            stroke="#000000"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeWidth="0.02"
          />
          <path
            d="M28.2225+50.7717C27.102+46.8136+31.1784+43.5828+34.582+43.5828C37.9855+43.5828+42.239+47.7781+40.3946+51.4686C39.8618+52.5347+39.2145+51.3604+35.7299+51.8882C33.3327+52.2513+37.5033+55.2993+33.5678+54.9685C29.6312+54.6376+34.7299+52.3221+31.9228+51.5509C29.0549+50.7631+28.3276+51.143+28.2225+50.7717Z"
            fill="#e5eaf5"
            opacity="1"
          />
          <path
            d="M11.0449+35.9359C12.4058+33.439+14.183+36.8967+16.2355+35.3208C18.4405+33.6277+16.5322+30.8219+17.7168+24.4132C19.4247+15.173+27.7393+11.014+35.7532+11.014C43.3253+11.014+49.4467+16.351+50.714+23.9083C51.7886+30.316+52.1864+32.0945+50.1732+38.4588C48.6239+43.3564+61.5762+45.3552+54.4375+49.2081C48.6838+52.3136+52.925+57.9015+48.2859+57.8242C42.3469+57.7253+44.4404+53.826+39.5582+51.7339C37.1969+50.722+38.8661+45.0991+34.223+44.7044C30.7649+44.4105+31.4415+50.8179+28.1248+50.6751C23.8402+50.4907+24.1644+57.5852+20.8987+57.0049C17.3745+56.3787+19.7441+52.4242+15.8457+52.0821C11.8621+51.7325+13.7485+57.8567+10.1264+53.9143C5.05744+48.3971+13.2354+49.2216+13.9017+44.3339C14.5934+39.2587+8.41274+40.7652+11.0449+35.9359Z"
            fill="#f7f8fa"
            opacity="1"
            stroke="#000000"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeWidth="0.02"
          />
          <path
            d="M27.8778+40.8392C26.6955+39.9006+29.5623+38.9946+31.061+38.818C32.4975+38.6488+32.7299+38.8477+34.7009+38.7419C36.5376+38.6433+36.775+38.3924+37.9193+38.3113C39.0663+38.2299+40.6586+38.276+40.1143+39.7471C39.8688+40.4106+39.3415+40.7257+38.2628+41.0442C36.5794+41.5413+33.6678+42.0254+31.1337+41.8366C27.4168+41.5596+31.802+45.5907+29.0502+45.5409C26.3014+45.4912+30.0506+42.5641+27.8778+40.8392Z"
            fill="#e9dde0"
            opacity="1"
            stroke="#0a0a0a"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeOpacity="0"
            strokeWidth="0.2"
          />
          <path
            d="M29.2234+40.5908C28.9746+39.609+30.5978+39.3441+31.8381+39.219C33.027+39.0992+33.222+39.2319+34.8548+39.1524C36.3763+39.0784+36.5701+38.9088+37.5178+38.8493C38.4677+38.7898+39.7883+38.814+39.3547+39.805C39.1592+40.2519+38.7259+40.4659+37.8353+40.6845C36.4458+41.0257+34.0415+41.288+31.9346+41.2473C30.6245+41.222+29.3169+40.96+29.2234+40.5908Z"
            fill="#c3002f"
            opacity="0.55"
            stroke="#ffffff"
            strokeLinecap="butt"
            strokeLinejoin="round"
            strokeWidth="0.02"
          />
          <g opacity="1">
            <path
              d="M19.8057+28.5876C21.0658+24.2387+25.5988+18.1746+29.3865+18.8712C33.1743+19.5677+34.7824+26.7612+33.5224+31.1101C32.2623+35.459+28.1703+38.4198+24.3825+37.7232C20.5948+37.0267+18.5457+32.9365+19.8057+28.5876Z"
              fill="#e9dde0"
              opacity="0.55"
              stroke="#c3002f"
              strokeLinecap="butt"
              strokeLinejoin="round"
              strokeOpacity="0"
              strokeWidth="0.1"
            />
            <path
              d="M21.0998+28.3699C22.1511+24.7266+25.9267+19.6453+29.0777+20.2271C32.2287+20.8089+33.5619+26.8336+32.5106+30.4769C31.4593+34.1201+28.0526+36.6019+24.9016+36.0201C21.7506+35.4383+20.0485+32.0132+21.0998+28.3699Z"
              fill="#34558b"
              opacity="0.55"
              stroke="#ffffff"
              strokeLinecap="butt"
              strokeLinejoin="round"
              strokeWidth="0.1"
            />
          </g>
          <g opacity="1">
            <path
              d="M36.0521+31.1037C35.1134+26.7209+36.1345+19.6519+39.6336+18.9776C43.1327+18.3034+47.7847+24.2793+48.7234+28.6621C49.6621+33.0449+47.5866+37.1445+44.0875+37.8187C40.5884+38.4929+36.9909+35.4865+36.0521+31.1037Z"
              fill="#e9dde0"
              opacity="0.55"
              stroke="#c3002f"
              strokeLinecap="butt"
              strokeLinejoin="round"
              strokeOpacity="0"
              strokeWidth="0.1"
            />
            <path
              d="M37.4404+30.0959C36.7791+26.5407+37.6853+20.6606+40.4791+20.1671C43.2729+19.6736+46.8965+24.7536+47.5577+28.3088C48.219+31.864+46.4902+35.1462+43.6964+35.6397C40.9025+36.1332+38.1016+33.6512+37.4404+30.0959Z"
              fill="#34558b"
              opacity="0.55"
              stroke="#ffffff"
              strokeLinecap="butt"
              strokeLinejoin="round"
              strokeWidth="0.1"
            />
          </g>
        </g>
      </svg>
    </Frame>
  )
}

export default GhostIcon
