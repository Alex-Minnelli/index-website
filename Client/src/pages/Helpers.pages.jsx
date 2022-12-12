import "../App.css";
import { Helmet } from "react-helmet";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Axios from 'axios';

function CRUD(action, type, challenge, mapList){
  const [number, setNumber] = useState();
  const [tower1, setTower1] = useState();
  const [tower2, setTower2] = useState();
  const [upgrades, setUpgrades] = useState();
  const [map, setMap] = useState();
  const [version, setVersion] = useState();
  const [date, setDate] = useState();
  const [person, setPerson] = useState();
  const [link, setLink] = useState();
  const [current, setCurrent] = useState(false);
  let og; if(type === 'OG') {og = true} else if(type === 'ALT'){og = false};
  
  if(action === '' || type === '' || challenge === ''){
    return<img src='https://preview.redd.it/3n2zbtb71x141.png?width=960&crop=smart&auto=webp&s=fbd98bbc057b3b222dcc4438fc47b3f6ef39ba86' alt='PatFunky' width='400px'></img>
  }else if(action === 'Add'){
    if(type === 'OG' && challenge === '2TC'){
        return(
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                        <Form.Control type="text" placeholder="Tower 1" onChange={e => setTower1(e.target.value)}/>
                        <Form.Control type="text" placeholder="Tower 2" onChange={e => setTower2(e.target.value)}/>
                        <Form.Control type="text" placeholder="Upgrades" onChange={e => setUpgrades(e.target.value)}/>
                        <Form.Label>Map</Form.Label>
                        <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Map}>{ele.Map}</option>)})}</Form.Select>
                        <Form.Control type="text" placeholder="Version" onChange={e => setVersion(e.target.value)}/>
                        <Form.Control type="text" placeholder="Date" onChange={e => setDate(e.target.value)}/>
                        <Form.Control type="text" placeholder="Person" onChange={e => setPerson(e.target.value)}/>
                        <Form.Control type="text" placeholder="Link" onChange={e => setLink(e.target.value)}/>
                        <Form.Check inline checked={current} label="Current" type='switch' id='Current' onChange={e => setCurrent(!current)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addOG2tc}>Add Combo</Button>
                </Form>
            </div>
        )
    } else if (type === 'ALT' && challenge === '2TC'){
        return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Label>Map</Form.Label>
                      <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Abbrev}>{ele.Map}</option>)})}</Form.Select>
                      <Form.Control type="text" placeholder="Person" onChange={e => setPerson(e.target.value)}/>
                      <Form.Control type="text" placeholder="Link" onChange={e => setLink(e.target.value)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={addALT2tc}>Add Combo</Button>
              </Form>
          </div>
    )}
  } else if (action === 'Delete'){
    if(challenge === '2TC' && (type)){
      return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Label>Map</Form.Label>
                      <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Abbrev}>{ele.Map}</option>)})}</Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={delete2tc}>Delete Combo</Button>
              </Form>
          </div>
    )}
  } else if (action === 'Edit'){
    if(type === 'OG' && challenge === '2TC'){
      return(
          <div>
              <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Combo to Edit</Form.Label>
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Label>Map</Form.Label>
                      <Form.Select onChange={e => setMap(e.target.value)}>{mapList.map(ele => {return(<option value={ele.Abbrev}>{ele.Map}</option>)})}</Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Number" onChange={e => setNumber(e.target.value)}/>
                      <Form.Control type="text" placeholder="Tower 1" onChange={e => setTower1(e.target.value)}/>
                      <Form.Control type="text" placeholder="Tower 2" onChange={e => setTower2(e.target.value)}/>
                      <Form.Control type="text" placeholder="Upgrades" onChange={e => setUpgrades(e.target.value)}/>
                      <Form.Control type="text" placeholder="Map" onChange={e => setMap(e.target.value)}/>
                      <Form.Control type="text" placeholder="Version" onChange={e => setVersion(e.target.value)}/>
                      <Form.Control type="text" placeholder="Date" onChange={e => setDate(e.target.value)}/>
                      <Form.Control type="text" placeholder="Person" onChange={e => setPerson(e.target.value)}/>
                      <Form.Control type="text" placeholder="Link" onChange={e => setLink(e.target.value)}/>
                      <Form.Check inline checked={current} label="Current" type='switch' id='Current' onChange={e => setCurrent(!current)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={'a'}>Edit Combo</Button>
              </Form>
          </div>
      )
    }
  }


  function addOG2tc(){
    Axios.post('http://localhost:5000/add/2tc/og', {
      number: +number, 
      tower1: tower1, 
      tower2: tower2, 
      upgrades: upgrades,
      map: map,
      version: +version,
      date: date,
      person: person,
      link: link,
      current: current ? 1 : 0,
      og: og ? 1 : 0
    })
  }

  function addALT2tc(){
    Axios.post('http://localhost:5000/add/2tc/alt', {
      number: +number, 
      map: map,
      person: person,
      link: link,
      og: og ? 1 : 0
    })
  }

  function delete2tc(){
    Axios.delete(`http://localhost:5000/delete/2tc/${number}/${map}`)
  }
}

export function Helper() {
    const [action, setAction] = useState('');
    const [type, setType] = useState('');
    const [challenge, setChallenge] = useState('');
    const [mapList, setMapList] = useState()
    useEffect(() => {Axios.get('http://localhost:5000/maps').then((res) => {setMapList(res.data)})}, [])

  return (
    <div>
      <Helmet>
        <title>BTD6 Index | Helpers</title>
      </Helmet>
      <h1>Helpers Section</h1>
      <Form>
        <div key='action' className="mb-3">
          <Form.Check inline label="Add Combo" name="group1" type="radio" id='Add' onChange={(e) => setAction(e.target.id)}/>
          <Form.Check inline label="Delete Combo" name="group1" type="radio" id='Delete' onChange={(e) => setAction(e.target.id)}/>
          <Form.Check inline label="Edit Combo" name="group1" type="radio" id='Edit' onChange={(e) => setAction(e.target.id)}/>
        </div>
        <div key='type' className="mb-3">
          <Form.Check inline label="OG Combo" name="group3" type="radio" id='OG' onChange={(e) => setType(e.target.id)}/>
          <Form.Check inline label="ALT Combo" name="group3" type="radio" id='ALT' onChange={(e) => setType(e.target.id)}/>
        </div>
        <div key='challenge' className="mb-3">
          <Form.Check inline label="2TC" name="group2" type="radio" id='2TC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="FTTC" name="group2" type="radio" id='FTTC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LCC" name="group2" type="radio" id='LCC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LTC" name="group2" type="radio" id='LTC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="2MPC" name="group2" type="radio" id='2MPC' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="LCD" name="group2" type="radio" id='LCD' onChange={(e) => setChallenge(e.target.id)}/>
          <Form.Check inline disabled label="2TCC" name="group2" type="radio" id='2TCC' onChange={(e) => setChallenge(e.target.id)}/>
        </div><br/>
      </Form>

      {CRUD(action, type, challenge, mapList)}
    </div>
  );
}