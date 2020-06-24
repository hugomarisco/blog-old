import React from "react"

class AdvizrPage extends React.Component {
  render() {
    return (
      <>
      <div style={{background: 'green', height: '50px', }}>some header</div>
      <iframe title="Advizr" src="https://app.advizr.com" frameborder="0" style={{width: '100vw', height: 'calc(100vh - 50px)'}}></iframe>
      </>
    )
  }
}

export default AdvizrPage

