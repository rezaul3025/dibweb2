# Local development environment setup

Steps to install Python on Windows and macOS

---

## 1. Installing Python on Windows

### Step 1: Download Python
1. Open your browser and go to the official Python website: https://www.python.org/downloads/.
2. Click on the latest Python version for Windows (e.g., "Download Python 3.x.x").
3. The installer will be downloaded to your machine.

### Step 2: Run the Python Installer
1. Open the downloaded Python installer `.exe` file.
2. **Important**: Make sure to check the box **"Add Python to PATH"**.
3. Select the option **"Customize Installation"** and then click **"Next"**.
4. In the next step, leave the optional features as they are and click **"Next"**.
5. In the "Advanced Options" section, select:
   - **Install for all users**
   - **Precompile standard library**
6. Click **"Install"** to begin the installation.

### Step 3: Verify the Installation
1. Open the Command Prompt (search for "cmd").
2. Type:

   ```bash
   python --version

---

## 2. Installing Python on macOS

### Step 1: Download Python
1. Visit the official Python website: https://www.python.org/downloads/mac-osx/.
2. Click the "Download Python 3.x.x" button to get the latest version compatible with macOS.
### Step 2: Install Python
1. Open the downloaded .pkg file and follow the on-screen instructions to install Python.
### Step 3: Verify the Installation
1. Open the Terminal (search for "Terminal" in Spotlight).
2. Run the following command to check the Python version:
    ```bash
    python3 --version
    ```  
    You should see the installed version, e.g., Python 3.x.x.
3. Similarly, check pip:
    ```bash
    pip3 --version
    ```
   If pip is installed, it should return a version number.

---

## Setup python virtual ENV

### Step-by-Step Setup

* Open a terminal and move into the project directory e.g dibweb2 where you'd like to set up the virtual environment.
* Use the following command to create a virtual environment:
   ```bash
   python3 -m venv venv
   ```
   please keep the virtual env name like above e.g venv, if you want give different name please added it to .gitignore
   so it will not push to repo
* Activate the Virtual Environment \
   After the virtual environment is created, you need to activate it:
   * On mac OS:
      ```bash
      source venv/bin/activate
      ```
   * On Windows:
       ```bash
      venv\Scripts\activate
       ```

---

## Install Required Packages form requirements.txt
  Make sure you are project root directory and install the dependencies by running:
  ```bash
   pip install -r requirements.txt
  ```

## Run react frontend application
   Make sure you have install nodejs and with the package mamager npm or yarn \
   Go to frontend directory g.g. `divweb2/frontend/` and run:
   ```bash
    yarn run dev
   ```

## Run backend python application
   Open new terminal on new tab or window and go to project root directory e.g `dibweb2/`
   and run:
   ```bash
    python manage.py runserver
   ````