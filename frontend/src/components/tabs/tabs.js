import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./tabs.css"

function JustifiedTab({extra , extra2}) {
    return (
        <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3 tabsbanner"
            justify
        >
            <Tab eventKey="home" title="Home" className='tabnormal' >
                {extra}
            </Tab>
            <Tab eventKey="Productos" title="Ofertas" className='tabnormal'>
                {extra2}
            </Tab>
        </Tabs>
    );
}

export default JustifiedTab;