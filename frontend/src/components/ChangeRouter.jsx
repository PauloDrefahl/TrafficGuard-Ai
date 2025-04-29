// Change Router Card on the Settings PAGE
import React, { useState } from 'react';
import ScrollBoxRouter from './ScrollBoxRouter';

const ChangeRouter = () => {

    // Brand Dropdown Menu .js
    const brands = ['Mango', 'Beryl'];
    const [selectedBrand, setSelectedBrand] = useState('-- Select --');
    const [isBrandOpen, setIsBrandOpen] = useState(false);

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
        setIsBrandOpen(false);
    };

    // Model Dropdown Menu .js
    const models = ['Mango', 'Beryl'];
    const [selectedModel, setSelectedModel] = useState('-- Select --');
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleModelClick = (model) => {
        setSelectedModel(model);
        setIsModelOpen(false);
    };


    return(

        <div className="card "
            style={{

                /* Box CSS */
                maxWidth: '100%',
                minWidth: '80%', /* Prevents the box from collapsing */
                width: '90%',
                height: 'auto',

            }}>

            <div className="card-body" 
    
                style = {{

                    /* Text CSS */
                    marginLeft: '10px',
                    display: 'flex', /* This and flexDir and gap allow for a vertical stack */
                    flexDirection: 'column',
                    gap: '10px'

                }}>

                  {/* Select Router Section */}
                <h11>Select Router</h11>
                <div 
                    style={{ 
                        
                        height: '200px', 
                        backgroundColor: '#F0F0F0',
                        borderRadius: '15px',
                    
                    }}>

                    <ScrollBoxRouter height="100%" width="100%">
                       
                       <div>

                       </div>
                    
                    </ScrollBoxRouter> {/* Scroll Router Menu */}

                </div>



                {/* Add Router Section */}
                <h11>Add Router</h11>

                {/* Router Brand Menu */}
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: '25px'
                    }}>

                    <h10 style={{ marginLeft: '25px'}}>Router Brand</h10>

                    <div className="dropdown">

                        <button className="dropbtn" onClick={() => setIsBrandOpen(!isBrandOpen)}>
                            {selectedBrand} <span className="arrow">{isBrandOpen ? '▲' : '▼'}</span>
                        </button>

                        {isBrandOpen && (

                            <div className="dropdown-content">

                            {brands.map((brands, idx) => (

                                <div

                                key={idx}
                                className="dropdown-item"
                                onClick={() => handleBrandClick(brands)}
                                >

                                {brands}

                                </div>
                            ))}

                            </div>
                        )}
                    </div>
                </div>

                {/* Router Model Menu */}
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: '22px',
                        position: 'relative', /* KEY */
                        overflow: 'visible' /* ensure dropdown can spill over */
                    }}>

                    <h10 style={{ marginLeft: '25px'}}>Router Model </h10>

                    <div className="dropdown" style={{ position: 'relative' }}>

                        <button className="dropbtn" onClick={() => setIsModelOpen(!isModelOpen)}>

                            {selectedModel} <span className="arrow">{isModelOpen ? '▲' : '▼'}</span>

                        </button>

                        {isModelOpen && (

                            <div className="dropdown-content">

                            {models.map((model, idx) => (

                                <div

                                key={idx}
                                className="dropdown-item"
                                onClick={() => handleModelClick(model)}
                                >

                                {model}

                                </div>
                            ))}
                            </div>
                        )}
                    </div>

                </div>
                
                 {/* User IP Address Text Box */}
                <div 
                    style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        gap: '50px'
                    }}>
                    
                    <h10 style={{ marginLeft: '25px'}}>IP Address </h10>
                    {/* User Ip Textbox */}
                    <div className="text-box"

                        style={{

                            height: '50px',
                            width: '45%',

                        }}>

                    <input type="text" className="custom-input" placeholder="e.g. 192.103.577.901"/>

                    </div>

                    <div className="button">Add</div>

                </div>
                

            </div>

            
        </div>

    );

};

export default ChangeRouter;