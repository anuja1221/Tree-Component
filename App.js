import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineFile, AiFillFolder } from "react-icons/ai";
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from "react-icons/di";
import "./styles.css";

const FILE_ICONS = {
  js: <DiJavascript1 />,
  css: <DiCss3Full />,
  html: <DiHtml5 />,
  jsx: <DiReact />
};

const StyledTree = styled.div`
  line-height: 1.5;
`;
const StyledFile = styled.div`
  position: relative;
  padding: 5px 5px 5px 15px;
`;

const StyledFolder = styled.div`
  padding-left: 20px;

  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;
const Collapsible = styled.div`
  height: ${(p) => (p.isOpen ? "0" : "auto")};
  overflow: hidden;
`;

const File = ({ name }) => {
  let ext = name.split(".")[1];

  return (
    <StyledFile>
      {/* render the extension or fallback to generic file icon  */}
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <span>{name}</span>
    </StyledFile>
  );
};

const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        <AiFillFolder  color="blue" />
        <span>{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  );
};

const Tree = ({ children }) => {
  return <StyledTree>{children}</StyledTree>;
};

Tree.File = File;
Tree.Folder = Folder;

export default function App() {
  return (
    <div className="App">
      <Tree>
        <Tree.Folder name="Project">
          <Tree.Folder name="code">
          <Tree.Folder name="css">
            <Tree.File name="style.css" />
          </Tree.Folder>
          <Tree.Folder name="component">
            <Tree.File name="App.js" />
          </Tree.Folder>
          <Tree.File name="Structure.json" />
          <Tree.File name="index.js" />
          </Tree.Folder>
          <Tree.Folder name="media">
          <Tree.Folder name="css">
            <Tree.File name="style.css" />
          </Tree.Folder>
          </Tree.Folder>
        </Tree.Folder>
      </Tree>
    </div>
  );
}
