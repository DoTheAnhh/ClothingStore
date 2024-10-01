import React from 'react'
import { Carousel } from 'antd'

const CarouselContent = () => {

    const carouselStyle: React.CSSProperties = {
        width: '55%',
        margin: '0 140px',
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
            <div style={{ float: "right", marginRight: 150, marginTop: -244 }}>
                <div>
                    <img src="https://cf.shopee.vn/file/sg-11134258-7rdxo-m0mtuvbm56guc5_xhdpi" width={368} height={120} alt="Side Image 1" />
                </div>
                <div>
                    <img src="https://cf.shopee.vn/file/sg-11134258-7rdx6-m0mtuxzwchww37_xhdpi" width={368} height={120} alt="Side Image 2" />
                </div>
            </div>
        </div>
    )
}

export default CarouselContent