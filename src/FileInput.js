/**
 * Copyright (c) Siddharth Jain.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";

const FileInput = ({ onChange, maxFileSize, value, accept, maxFileCount }) => {
  const [list, setList] = useState(value || []);

  const triggerUpdate = () => {
    setList(list.slice());
    onChange && onChange(list);
  };

  const handleUp = (e, i) => {
    const temp = list[i];
    list[i] = list[i - 1];
    list[i - 1] = temp;
    triggerUpdate();
  };

  const handleDown = (e, i) => {
    const temp = list[i];
    list[i] = list[i + 1];
    list[i + 1] = temp;
    triggerUpdate();
  };

  const handleDelete = (e, i) => {
    list.splice(i, 1);
    triggerUpdate();
  };

  const validate = (file) => {
    if (maxFileSize && maxFileSize > 0 && file.size > maxFileSize) {
      return (        
          <span>{String.fromCharCode(9888)}</span>        
      );
    }
  };

  const renderHtmlTable = () => {
    if (list) {
      return (
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => {
              return (
                <tr key={i}>
                  <td key={i + ":#"}>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.size}</td>
                  <td>{item.type}</td>
                  <td>
                    {i > 0 ? (
                      <button
                        key={i + ":up"}
                        onClick={(e) => handleUp(e, i)}
                      >
                        {String.fromCharCode(9650)}
                      </button>
                    ) : null}
                    {i < list.length - 1 ? (
                      <button
                        key={i + ":down"}
                        onClick={(e) => handleDown(e, i)}
                      >
                        {String.fromCharCode(9660)}
                      </button>
                    ) : null}
                    <button
                      key={i + ":del"}
                      onClick={(e) => handleDelete(e, i)}
                    >
                      {String.fromCharCode(10006)}
                    </button>
                    {validate(item)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  const handleOnChange = (e) => {
    for (var file of e.target.files) {
      list.push(file);
    }
    triggerUpdate();
  };

  const renderFileInput = () => {
    if (!(maxFileCount > 0) || list.length < maxFileCount) {
      return <input type="file" onChange={handleOnChange} accept={accept} />;
    }
  };

  return (
    <>
      {renderHtmlTable()}
      {renderFileInput()}
    </>
  );
}

export default FileInput;
