import Link from 'next/link';

export default function Header(props: any) {
  return (
    <header className="header">
      <nav className="nav" role="navigation" aria-label="main navigation">
        <Link href="/">
          <h1>{props.siteTitle}</h1>
        </Link>
        <div>
          <Link
            href={`${
              typeof window !== 'undefined' && window.location.pathname == '/about' ? '/' : '/about'
            }`}
          >
            <h1>{`${
              typeof window !== 'undefined' && window.location.pathname == '/about'
                ? 'close'
                : 'about'
            }`}</h1>
          </Link>
        </div>
      </nav>
      <style jsx>
        {`
          h1 {
            margin-bottom: 0;
          }
          h1:hover {
            cursor: pointer;
          }
          nav {
            padding: 1.5rem 1.25rem;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
          }
          @media (min-width: 768px) {
            .header {
              height: 100vh;
              position: fixed;
              left: 0;
              top: 0;
            }
            .nav {
              padding: 2rem;
              width: 30vw;
              height: 100%;
              border-right: 1px solid #ebebeb;
              border-bottom: none;
              flex-direction: column;
              align-items: flex-start;
            }
          }
        `}
      </style>
    </header>
  );
}
