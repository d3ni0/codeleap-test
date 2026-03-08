export default function Footer({ variant = 'default' }) {
  const isAbsolute = variant === 'absolute';

  return (
    <footer
      className={
        isAbsolute
          ? 'absolute bottom-0 left-0 right-0 bg-dark-bg py-4 px-4'
          : 'bg-dark-bg py-6 px-4 mt-8'
      }
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-dark-yellow text-base font-medium">
          Developed by{' '}
          <a
            href="https://d3ni0.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:opacity-80 transition-all duration-300 hover:scale-110 inline-block"
            style={{ color: '#8040FF' }}
          >
            {'{ d3ni0 }'}
          </a>
        </p>
      </div>
    </footer>
  );
}
