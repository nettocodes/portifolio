"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "todos", label: "Todos", count: 4 },
  { id: "freela", label: "Freelance", count: 2 },
  { id: "pessoal", label: "Pessoal", count: 1 },
  { id: "open-source", label: "Open Source", count: 1 },
];

export default function ProjectFilters({ activeFilter, onFilterChange }: ProjectFiltersProps) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    }}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            border: 'none',
            background: activeFilter === filter.id 
              ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
              : 'var(--card-bg)',
            color: activeFilter === filter.id ? 'var(--background)' : 'var(--foreground)',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: activeFilter === filter.id 
              ? '0 10px 25px rgba(0, 207, 255, 0.3)'
              : '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>{filter.label}</span>
          <span style={{ 
            background: activeFilter === filter.id 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'var(--background)',
            padding: '0.2rem 0.5rem',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            {filter.count}
          </span>
          
          {/* Efeito de brilho */}
          {activeFilter === filter.id && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
              animate={{ left: '100%' }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
} 