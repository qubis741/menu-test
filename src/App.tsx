import React, { ComponentType } from 'react'
import { PreviewPage } from 'pages/PreviewPage'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { EditorPage } from 'pages/EditorPage'
import { pages } from 'routing'

const App: ComponentType = () => {
    return (
        <Router>
            <AppBar position="sticky">
                <Toolbar sx={{ justifyContent: 'end' }}>
                    <Link to={pages.preview}>
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ color: 'white' }}
                        >
                            Preview
                        </Typography>
                    </Link>
                    <Link to={pages.editor}>
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
                    <Route exact path={pages.preview}>
                        <PreviewPage />
                    </Route>
                    <Route path={pages.editor}>
                        <EditorPage />
                    </Route>
                </Switch>
            </Container>
        </Router>
    )
}

export default App
