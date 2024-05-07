
import React, { useState } from 'react';
import JustifiedTab from './../tabs/tabs.js';
import Sidebar1 from './../sidebar/sidebar.js';

function ParentComponent() {
    const [activeTab, setActiveTab] = useState('home'); // State to track active tab

    // Function to handle tab change
    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (
        <div>
            <Sidebar1 onTabChange={handleTabChange} />
            <JustifiedTab activeTab={activeTab} />
        </div>
    );
}

export default ParentComponent;
