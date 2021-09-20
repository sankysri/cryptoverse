import React, {useState,useEffect} from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';

import {useGetCryptosQuery} from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100;
    const {data:cryptoList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')


    useEffect(()=>{
        const filteredData = cryptoList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        setCryptos(filteredData)
    },[cryptoList,searchTerm])

    if(isFetching) return 'Loading...';

    return (
        <>
            {
                !simplified && 
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrencies" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            }
            
            <Row gutter={[32, 32]} className="crypto-card-container">
                {
                    cryptos?.map(item=>(
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.id}>
                            <Link to={`/crypto/${item.id}`}>
                                <Card
                                title={`${item.rank}. ${item.name}`}
                                extra={<img className="crypto-image" src={item.iconUrl} alt="icon"/>}
                                hoverable
                                >
                                    <p>Price: {millify(item.price)}</p>
                                    <p>Market Cap: {millify(item.marketCap)}</p>
                                    <p>Daily Change: {millify(item.change)}</p>
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies
