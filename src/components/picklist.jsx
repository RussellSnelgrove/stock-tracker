import Select from 'react-select'
import Exchanges from '../lib/picklists/exchanges.json';

function Picklist() {
    return (
        <>
            <Select options={Exchanges} />
        </>

    );
};
export default Picklist;