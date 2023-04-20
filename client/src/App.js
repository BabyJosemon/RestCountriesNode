import React from 'react'
import { useState } from 'react'
import './App.css'
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Container,
    Grid,
    Box,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core'

function App() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [fullText, setFullText] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://rest-countries-api-3tac.onrender.com/api/${searchTerm}?fullText=${fullText}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.status === 404) {
                    setMessage(data.message)
                } else {
                    setData(data)
                }
            })
            .catch((err) => {
                console.log('Error ' + err)
            })
    }
    return (
        <>
            <Container>
                <h1
                    style={{
                        width: '100vw',
                        margin: 'auto 0',
                        fontSize: '72px',
                    }}
                >
                    Countries API
                </h1>
                <Box
                    style={{
                        height: '60vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Grid
                        container
                        style={{
                            width: '60vw',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Grid item xs={12}>
                            <TextField
                                className="dark-mode"
                                style={{
                                    width: '100%',
                                }}
                                label="Enter Country Name"
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{
                                            color: '#2196f3',
                                        }}
                                        checked={fullText}
                                        onChange={(e) =>
                                            setFullText(e.target.checked)
                                        }
                                    />
                                }
                                label="FullText"
                            />
                        </Grid>
                        <Grid
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            item={12}
                        >
                            <Button
                                style={{
                                 backgroundColor: '#2196f3',
                                }}
                                onClick={handleSubmit}
                                variant="contained"
                                size={'large'}
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            {data.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Flag</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Official Name</TableCell>
                                <TableCell>Currency</TableCell>
                                <TableCell>Capital</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Languages</TableCell>
                                <TableCell>Population</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((result) => (
                                <TableRow key={result.cca3}>
                                    <TableCell>
                                        <img className="flag" src={result.flags.png} alt={`Flag of ${result.name.common}`} />
                                    </TableCell>
                                    <TableCell>{result.name.common}</TableCell>
                                    <TableCell>
                                        {result.name.official}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            result.currencies[
                                                Object.keys(
                                                    result.currencies
                                                )[0]
                                            ].name
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {result.capital
                                            ? result.capital.join(',')
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{result.region}</TableCell>
                                    <TableCell>
                                        {result.languages[Object.keys(result.languages)[0]]}
                                    </TableCell>
                                    <TableCell>{result.population}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box
                    style={{
                        height: '5vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '64px',
                    }}
                >
                    {message}
                </Box>
            )}
        </>
    )
}

export default App
