import { ReactElement } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { Logo } from '../Logo';

import { Container } from './styles';

interface HeaderProps {
  openModal:() => void;
}

export const Header = ({openModal}:HeaderProps) : ReactElement =>{
  return (
    <Container>
      <header>
        <Logo />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}
