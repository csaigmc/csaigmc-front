import React from 'react'

const Tab = ({text, isActive, onChange}) => {
    return (
        <div onClick={onChange} className='d-inline-block px-2'>
            <div className="font-head small py-2 font-weight-bolder" style={{cursor: "pointer", borderBottom: `2px solid ${isActive ? "var(--secondary-main)" : "#00000000"}`}}>{text}</div>
        </div>
    )
}

export const Tabs = ({tabList, currentTab, onChange}) => {
    return (
        <div className="px-3" style={{borderBottom: "0.5px solid #fffffff0", paddingBottom: "0.6px"}}>
            {
                tabList.map((item, index) => {
                    return (
                        <Tab key={index} text={item} isActive={currentTab === index} onChange={() => onChange(index)}/>
                    )
                })
            }
        </div>
    )
}