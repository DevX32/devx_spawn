export const getHouses = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      fetch('https://devx_spawn/devx_spawn:server:getProperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };