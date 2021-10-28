import styled from 'styled-components'

export const Fixed = styled.div`
  position: fixed;
  top: 100px;
  width: 400px;
  right: 10px;
  padding: 2px;
  z-index: 100;
  text-align: center;
`

export const FloatingNotification = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 20px;
  border-radius: 2px;
  padding: 10px;
`

export const Status = styled.div`
  height: auto;
  border-radius: 2px;
  margin-right: 2px;
  padding: 2px;
  background-color: white;
  color: black;
`

export const Pending = styled(Status)`
  background-color: light-blue;
  color: black;
  border: 2px solid black;
  font-family: 'Roboto';
`

export const Success = styled(Status)`
  background-color: black;
  border: 2px solid black;
  color: white;
  font-family: 'Roboto';
`

export const Error = styled(Status)`
  background-color: black;
  border: 2px solid black;
  color: red;
  font-family: 'Roboto';
`

export const Message = styled.div`
  font-size: 0.9em;
  background-color: black;
  border: 2px solid black;
  color: white;
`

export const InfoMessage = styled.div`
  font-family: 'Roboto';
  font-size: 0.9em;
  text-align: left;
  color: black;
`

export const CloseModalButton = styled.button`
  background-color: white;
  border: 0px;
  height: 20px;
  width: 20px;
  padding-left: 5px;
  color: black;
  font-weight: bold;
  cursor: pointer;
`
