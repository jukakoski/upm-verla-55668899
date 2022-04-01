import React from 'react'

const HeroVideo: React.FC<HeroVideoProps> = ({ overlayText, videoUrl }) => {
    return (
        <div style={{ position: "relative", height: "65vh", marginBottom: "3rem" }}>
            <video autoPlay loop muted style={{ pointerEvents: "none", marginLeft: "auto", marginRight: "auto", width: "100%", objectFit: "cover", maxHeight: "65vh" }}>
                <source src={videoUrl} type="video/mp4" />
                <track kind="caption"></track>
            </video>
            <div style={{ position: "absolute", top: 0, left: 0, color: "white", background: "rgba(120, 120, 120, .5)", display: "flex", width: "100%", height: "100%" }}>
                <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "auto", marginBottom: "auto" }}>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        {overlayText}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HeroVideo

interface HeroVideoProps {
    videoUrl: string
    overlayText: string
}