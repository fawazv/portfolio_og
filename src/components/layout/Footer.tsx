export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-accent/30 border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold uppercase tracking-tighter">Dev.Portfolio</h3>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-6">
            <a href="https://linkedin.com/in/mohammed-fawaz" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wide hover:text-secondary transition-colors">LinkedIn</a>
            <a href="https://github.com/fawaz-v" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-wide hover:text-secondary transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
