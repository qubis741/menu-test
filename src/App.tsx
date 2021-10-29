import React, { ComponentType } from 'react'
import { PreviewPage } from 'pages/PreviewPage'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { EditorPage } from './pages/EditorPage'

const App: ComponentType = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'end' }}>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ color: 'white' }}
                        >
                            Preview
                        </Typography>
                    </Link>
                    <Link to="/editor">
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ marginLeft: '1em', color: 'white' }}
                        >
                            Editor
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ padding: '1rem 0' }}>
                <Switch>
                    <Route exact path="/">
                        <PreviewPage />
                    </Route>
                    <Route path="/editor">
                        <EditorPage />
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}

export default App
