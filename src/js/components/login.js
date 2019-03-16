import React from 'react';
import styled, {keyframes} from 'styled-components';
import Wrapper from './styled/wrapper';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: false,
            activePanelOpacity: false,
            activeTitle: false,
            activeButton: false,
        }
    }

    handleClickWrapper (e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({activePanel: true});
        console.log('foo',this.state.activePanel);
    }

    handleTransitionEnd(e) {
        switch (e.propertyName) {
            case 'transform':
                this.setState({activePanelOpacity: true});
                break;
            case 'background-color':
                this.setState({activeTitle: true});
                break;
            default:
                console.log(e.propertyName);
        }
    }

    handleAnimationEnd(e) {
        switch (e.animationName) {
            case 'iEJYHk':
                setTimeout(() => this.setState({activeButton: true}), 600);
                break;
            default:
                console.log(e.animationName);
        }
    }

    handleClickLinkButton(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({activePanel: false});
        this.props.history.push('/home');
    }

    render () {
        return (
            <Wrapper onClick={(e) => this.handleClickWrapper(e)}>
                <VideoBackground src="/video/movie01.mov" autoPlay loop muted />
                <Panel active={this.state.activePanel} opacity={this.state.activePanelOpacity.toString()} onTransitionEnd={(e) => this.handleTransitionEnd(e)}>
                    <Title active={this.state.activeTitle.toString()} onAnimationEnd={(e) => this.handleAnimationEnd(e)}>INVESTIGATION</Title>
                    <ButtonLink active={this.state.activeButton.toString()} onClick={(e) => this.handleClickLinkButton(e)}>LOGIN</ButtonLink>
                </Panel>
            </Wrapper>
        );
    }
}

export default withRouter(Login);

const VideoBackground = styled.video`
position: fixed;
right: 0;
bottom: 0;
min-width: 100%;
min-height: 100%;
width: 100%;
height: 100%;
background-color: #000000;
`;

const Panel = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding-top: 92px;
padding-bottom: 160px;
width: 700px;
height: 400px;
background: rgba(255, 255, 255, ${props => props.opacity === 'true' ? '.7' : '.3'});
transform: scale(${props => props.active === true ? '1' : '0'});
transition: all 200ms ease-in-out;
z-index: 1;
`;

const textFocusIn = keyframes`
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
`;

const Title = styled.div`
display: inline-block;
width: 100%;
font-size: 30px;
font-weight: bold;
line-height: 100%;
color: #707070;
text-align: center;
opacity: 0;
animation: ${textFocusIn} 400ms cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
animation-play-state: ${props => props.active === 'true' ? 'unset' : 'paused'};
`;

const puffInHor = keyframes`
  0% {
    transform: scaleX(2);
    filter: blur(2px);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    filter: blur(0px);
    opacity: 1;
  }
`;

const ButtonLink = styled.a`
position: relative;
width: 400px;
height: 80px;
font-size: 30px;
line-height: 80px;
color: #fff;
background-color: #4469B0;
text-decoration: none;
text-align: center;
outline: none;
box-shadow:0 3px 6px 0 rgba(0,0,0,0.53);
opacity: 0;
animation: ${puffInHor} 200ms cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
animation-play-state: ${props => props.active === 'true' ? 'unset' : 'paused'};

&:before {
content: "";
position: absolute;
top: 50%;
left: 30px;
transform: translateY(-50%);
width: 45px;
height: 45px;
background: url("/images/icon-fb.svg") center no-repeat;
background-size: contain;
}
`;
