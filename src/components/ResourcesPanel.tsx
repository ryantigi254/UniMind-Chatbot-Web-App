import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, RefreshCw, Heart } from 'lucide-react';
import { ChatResource } from '../services/resourcesService';

interface ResourcesPanelProps {
  resources: ChatResource[];
  isLoading: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ 
  resources, 
  isLoading, 
  onClose, 
  onRefresh 
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 shadow-lg z-20 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Support Resources
        </h2>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
              title="Refresh resources"
            >
              <RefreshCw className={`h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mb-3"></div>
            <p className="text-sm text-gray-500">
              Finding helpful resources...
            </p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            <Heart className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm mb-2">No resources yet</p>
            <p className="text-xs text-gray-400">
              Keep chatting and we'll suggest helpful resources
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-4">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} available
            </p>
            
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50"
              >
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2 leading-relaxed">
                  {resource.title}
                </h3>
                
                {resource.category && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {resource.category}
                  </p>
                )}
                
                {/* Contact information - simplified */}
                {resource.contacts && resource.contacts.length > 0 && (
                  <div className="space-y-1">
                    {resource.contacts.slice(0, 2).map((contact, index) => (
                      <div key={index} className="text-xs">
                        {contact.startsWith('http') ? (
                          <a
                            href={contact}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline inline-flex items-center gap-1"
                          >
                            Visit website <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : contact.includes('@') ? (
                          <a
                            href={`mailto:${contact}`}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                          >
                            {contact}
                          </a>
                        ) : contact.match(/^\d/) ? (
                          <a
                            href={`tel:${contact.replace(/\s/g, '')}`}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                          >
                            {contact}
                          </a>
                        ) : (
                          <span className="text-gray-600 dark:text-gray-400">{contact}</span>
                        )}
                      </div>
                    ))}
                    {resource.contacts.length > 2 && (
                      <p className="text-xs text-gray-400">
                        +{resource.contacts.length - 2} more ways to get in touch
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gentle footer message */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 text-center">
          These resources are here to support you whenever you need them
        </p>
      </div>
    </motion.div>
  );
};

export default ResourcesPanel; 