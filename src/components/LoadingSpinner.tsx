import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center"
        >
          <Loader2 size={24} className="text-white animate-pulse" />
        </motion.div>
        <div className="text-sm font-medium text-muted-foreground">
          Loading RootNexis...
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
