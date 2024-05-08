import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./tabs.css"

function JustifiedTab({extra , extra2, extra3, extra4}) {
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
            <Tab eventKey="Productos" title="Productos" className='tabnormal'>
                {extra2}
            </Tab>
            <Tab eventKey="Hmanuales" title="Herramientas manuales" className='tabnormal'>
                {extra3}
            </Tab>
            <Tab eventKey="Eseguridad" title="Equipo de seguridad" className='tabnormal'>
                {extra4}
            </Tab>
        </Tabs>
    );
}

export default JustifiedTab;