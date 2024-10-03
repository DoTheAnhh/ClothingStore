import React from 'react'
import { Carousel } from 'antd'

const CarouselContent: React.FC = () => {

    const carouselStyle: React.CSSProperties = {
        width: '80%',
        margin: '0 10%',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <div style={{marginRight: -10}}>
            <div>
                <Carousel autoplay style={carouselStyle} arrows infinite={true}>
                    <div>
                        <img style={imageStyle} src="https://cf.shopee.vn/file/sg-11134258-7rdvg-m0muknvpcmm2aa_xxhdpi" alt="Slide 1" />
                    </div>
                    <div>
                        <img style={imageStyle} src="https://cf.shopee.vn/file/sg-11134258-7rdvv-m0ro5wtsn9xacc_xxhdpi" alt="Slide 2" />
                    </div>
                    <div>
                        <img style={imageStyle} src="https://cf.shopee.vn/file/sg-11134258-7rdx2-m0mukpbl8ow4c5_xxhdpi" alt="Slide 3" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselContent