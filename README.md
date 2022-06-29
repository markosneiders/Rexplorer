<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/markosneiders/Rexplorer">
    <img src="README_images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Rexplorer</h3>

  <p align="center">
    Graphical transaction relationships explorer on 30 chains using the Covalent API
    <br />
    Built for the Covalent challenge in the GR14 hackathon
    <br />
    <a href="https://github.com/markosneiders/Rexplorer"><strong>Try it out »</strong></a>

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
       <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
       <li><a href="#demo">Demo</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

[![Rexplorer Screen Shot][product-screenshot]](https://example.com)

Rexplorer is a graphical transaction relationship explorer utilizing Covalent APIs. We created this to supplement existing chain exploration tools such as [etherscan](https://etherscan.io/) by providing a graphical alternative to better visualize the data.

## Features
* Large, intuitive, and easy to read graph
* Supports 30 chains
* Ability to view and copy transaction information and open in etherscan
* Easily go down a rabbit hole of graphs while exploring by clicking nodes
* Login with Metamask to quickly see your address
* Graph customization options such as link and length aswell as transaction count.
* Ability to input any address and select fomr 30 chains to explore
* Comprehensive help menu to guide you

[![Graph settings][graph-settings]](https://example.com)
[![Help][help]](https://example.com)
[![Transaction info][transaction-info]](https://example.com)
[![Graph info][graph-info]](https://example.com)

<p align="right">(<a href="#top">back to top</a>)</p>



## Built With

* [React.js](https://reactjs.org/)
* [Covalent APIs](https://www.covalenthq.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

## Demo

You can try out rexplorer without installing it locally [here](https://example.com). Simply log in with Metamask and get exploring!


## Prerequisites

Make sure you have the latest [node and npm](https://nodejs.org/en/download/) version. 

## Installation

1. Get a free API Key at [Covalent](https://www.covalenthq.com/platform/#/auth/register/)
2. Clone the repo
   ```sh
   git clone https://github.com/markosneiders/Rexplorer.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create a `.env` file and enter your api key (reffer to `.env.example` for an example)
   ```js
   REACT_APP_COVALENT_API_KEY = your_key
   ```
4. Start the project
   ```js
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
# Acknowledgments

* [Covalent APIs](https://www.covalenthq.com/)
* [react-d3-graph](https://github.com/danielcaldas/react-d3-graph)
* [MUI](https://mui.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/markosneiders/Rexplorer.svg?style=for-the-badge
[contributors-url]: https://github.com/markosneiders/Rexplorer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/markosneiders/Rexplorer.svg?style=for-the-badge
[forks-url]: https://github.com/markosneiders/Rexplorer/network/members
[stars-shield]: https://img.shields.io/github/stars/markosneiders/Rexplorer.svg?style=for-the-badge
[stars-url]: https://github.com/markosneiders/Rexplorer/stargazers
[issues-shield]: https://img.shields.io/github/issues/markosneiders/Rexplorer.svg?style=for-the-badge
[issues-url]: https://github.com/markosneiders/Rexplorer/issues
[license-shield]: https://img.shields.io/github/license/markosneiders/Rexplorer.svg?style=for-the-badge
[license-url]: https://github.com/markosneiders/Rexplorer/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: README_images/screenshot.png
[transaction-info]: README_images/transaction_info.png
[graph-settings]: README_images/graph_settings.png
[graph-info]: README_images/graph_info.png
[help]: README_images/help.png