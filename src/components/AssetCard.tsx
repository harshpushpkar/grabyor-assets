
import { useState } from 'react';
import { Check, Download, Copy } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AssetCardProps {
  id: string;
  name: string;
  category: string;
  svg: string;
}

const AssetCard = ({ id, name, category, svg }: AssetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svg).then(() => {
      setIsCopied(true);
      toast.success("SVG code copied to clipboard");
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  const downloadSvg = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("SVG file downloaded");
  };

  return (
    <div
      className={cn(
        "glass-card rounded-lg relative overflow-hidden group transition-all duration-300 animate-fade-in",
        "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
    >
      <AspectRatio ratio={1}>
        <div className="w-full h-full p-4 flex items-center justify-center">
          <div className="max-w-full max-h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </AspectRatio>

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm truncate">{name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{category}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Copy SVG code"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadSvg();
                }}
                className="p-1.5 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                title="Download SVG"
              >
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
