#!/bin/bash

# Function to display a message and exit with an error code
function error_exit {
  echo "❌ $1" 1>&2
  exit 1
}

# Check if component name argument is provided
if [ $# -eq 0 ]; then
  error_exit "Component name argument missing. Usage: ./rc.sh ComponentName"
fi

COMPONENT_NAME=$1

# Determine the component path based on the presence of "Section" in the name
if [[ "$COMPONENT_NAME" == *"Section"* ]]; then
  COMPONENT_PATH="./section/${COMPONENT_NAME}.jsx"
else
  COMPONENT_PATH="./${COMPONENT_NAME}.jsx"
fi

# Create the React component file with boilerplate code
cat <<EOC > $COMPONENT_PATH
import React from 'react';

const ${COMPONENT_NAME} = () => {
  return (
    <div>${COMPONENT_NAME}</div>
  );
}

export default ${COMPONENT_NAME};
EOC

# Success message for component creation
echo "🎉 Component ${COMPONENT_NAME} created successfully at ${COMPONENT_PATH}!"

# Update App.jsx to import and use the new component if it contains "Section"
if [[ "$COMPONENT_NAME" == *"Section"* ]]; then
  APP_PATH="../App.jsx"

  # Check if the import statement already exists
  if ! grep -q "import ${COMPONENT_NAME} from './components/section/${COMPONENT_NAME}';" $APP_PATH; then
    # Add the import statement at the top of App.jsx
    sed -i "1iimport ${COMPONENT_NAME} from './components/section/${COMPONENT_NAME}';" $APP_PATH
  fi

  # Add the component usage inside the App function, just before the closing main
  sed -i "/<\/main>/i \ \ \ \ <${COMPONENT_NAME} />" $APP_PATH

  # Success message for updating App.jsx
  echo "🎉 App.jsx updated to include ${COMPONENT_NAME}!"
fi
