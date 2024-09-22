# Africare - Enhancing Maternal Healthcare in Africa

## Introduction

Africare is a comprehensive platform addressing critical challenges in maternal healthcare across Africa. By leveraging AI-driven guidance, community support networks, and accessible resources, Africare aims to improve the quality of care for expectant mothers and healthcare providers.

## Problem Statement

Maternal healthcare in Africa faces significant challenges:

1. **Inadequate Healthcare Infrastructure**: Many regions lack sufficient healthcare facilities and trained professionals, resulting in high maternal and neonatal mortality rates.
2. **Mental Health Issues**: Prenatal and postnatal depression are prevalent among women, with inadequate mental health support.
3. **Fragmented Healthcare Services**: Accessing comprehensive and coordinated healthcare services is difficult.

## Proposed Solution

Africare aims to provide a holistic solution to these challenges by:

1. **Community Support Network**: Establishing forums and discussion groups for midwives to share experiences and seek advice.
2. **Prenatal and Postnatal Support**: Offering resources and support for women dealing with prenatal and postnatal depression, including access to mental health professionals.
3. **Emergency Assistance Integration**: Utilizing geolocation services to direct users to nearby medical facilities and pharmacies.
4. **Resource Sharing Platform**: Enabling users to share personal experiences and foster a supportive community.

## How Africare Solves the Problem

1. **AI Integration**: Africare provides real-time, AI-driven guidance through a chatbot.
2. **Comprehensive Platform**: Africare combines training, community support, mental health resources, and emergency assistance into a single platform, offering a one-stop solution for maternal healthcare.
3. **Accessibility**: Africare utilizes USSD services for areas with limited internet connectivity, ensuring broader reach and accessibility.
4. **Community Focus**: Africare fosters a supportive community for both midwives and mothers, facilitating continuous learning and emotional support, which is crucial for improving maternal health outcomes.

### Deployment Links
- **Frontend**: [Africare App](https://africare-app.netlify.app)
- **Backend**: [Africare Backend](https://africare.loca.lt) (hosted locally)
- To access and run the project successfully, open the backend link and enter the password as (105.161.130.75) so that the frontend works perfectly with the backend. This is for development purposes only. Localtunnel does this protection.

## AfriCare Health Project Repository

### Directory Structure

The repository is organized into several directories to separate different aspects of the project. Below is an overview of the directory structure:

```
/project-root
│
├── /auth                     # Firebase configuration files
│
├── /chatbot                  # Chatbot and community server code
│
├── /client                   # Frontend code (React + Vite)
│   ├── /node_modules         # Node.js modules for the frontend
│   ├── /public               # Public assets like index.html
│   ├── /src                  # Source code for the React application
│   ├── package.json          # Frontend-specific dependencies and scripts
│   ├── vite.config.js        # Vite configuration file
│   └── ...
│
├── /modules                  # Firestore, server, and socket backend middleware code
│
├── /node_modules             # Node.js modules for backend and server
│
├── /utils                    # Utility functions
│
├──index.js                   # Main entry point for the Node.js server
│
├── package.json              # Backend-specific dependencies and scripts
│
├── .gitignore                # Git ignore file
├── README.md                 # Project documentation
│
└── web.config                # Web server configuration file
```

### Explanation of the Directory Structure

- **/auth**: Contains Firebase configuration files necessary for authentication.
- **/chatbot**: Holds the code for the chatbot and related community features.
- **/client**: The frontend application developed using React and Vite.
- **/modules**: Contains backend middleware code for Firestore and sockets.
- **/utils**: Utility functions and scripts used across the application.
- **/node_modules**: Node.js modules required for both frontend and backend.

## Running the Project

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/MrHackeric/AfriCare-Health
   ```

2. Install backend Node.js modules:
   ```bash
   cd AfriCare-Health
   npm install
   ```

3. Navigate to the client directory and install frontend Node.js modules:
   ```bash
   cd client
   npm install
   ```

4. Obtain your Firebase SDK JSON file and place it in the `/auth` folder. Additionally, set up environment variables for Firebase, JavaScript Maps API, and Gemini in the root and client folders.

By following these steps, you will set up the Africare project locally.
