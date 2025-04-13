import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Favicon */}
                    <link rel="icon" href="/assets/images/logo/Logo_white.png"/>
                    {/* Other meta tags, if needed */}
                    <meta property="og:title" content="Your Project Name"/>
                    <meta property="og:description" content="A brief description of your project."/>
                    <meta property="og:image" content="%PUBLIC_URL%/logo.png"/>
                    <meta property="og:url" content="https://yourwebsite.com"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
