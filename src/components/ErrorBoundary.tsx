import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  private handleResetStorage = () => {
    try {
      localStorage.removeItem('photographicallyyours_wedding_data_v1');
    } catch (e) {
      console.warn(e);
    }
    window.location.hash = '#/photographicallyyours/sahil-kajal';
    window.location.reload();
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-gold-400 p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 text-amber-700" />
            </div>

            <h2 className="font-serif-royal text-2xl font-bold text-burgundy-950">
              Recovering Your Wedding Invitation
            </h2>

            <p className="font-serif text-sm text-charcoal-800/80 leading-relaxed">
              We detected a temporary data issue while rendering this customizer. You can instantly reload or restore default configuration below without losing progress.
            </p>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-left text-[11px] font-mono text-amber-900 overflow-x-auto max-h-28">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-full bg-burgundy-900 text-gold-200 font-serif text-xs font-bold hover:bg-burgundy-800 transition-colors flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className="w-4 h-4 text-gold-400" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetStorage}
                className="py-3 px-4 rounded-full border border-gold-400 text-burgundy-950 font-serif text-xs font-semibold hover:bg-gold-50 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Home className="w-4 h-4 text-gold-700" />
                <span>Reset to Sahil &amp; Kajal Defaults</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
