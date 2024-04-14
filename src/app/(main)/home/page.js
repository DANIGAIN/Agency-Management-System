import React from 'react'
function Home() {
  return (<>
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
    <p className="text-center">Run your agency, in one place</p>
    <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text ">
      <h1 className="text-9xl font-bold text-center md:text-[300px] ">
        Agency
      </h1>
    </div>
  </>)
}

export default Home