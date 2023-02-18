import styled from 'styled-components';

export const Container = styled.div`
  background: #D9043D;
  padding: 30px 0;

  header {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem 160px 2rem;

    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;

          .text {
            padding: 16px 24px;

            @media (max-width: 400px)
            {
              display: none;
            }
          }

          .icon {
            display: flex;
            padding: 16px 16px;
            background: #00A60D;
            border-radius: 0 8px 8px 0;
            @media (max-width: 400px)
            {
              border-radius:8px;
            }
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
