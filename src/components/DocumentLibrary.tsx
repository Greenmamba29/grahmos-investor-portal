import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Filter, Search } from 'lucide-react';
import { fetchInvestorDocuments, formatDate, type InvestorDocument } from '@/lib/notionCMS';
import { useAuth } from '@/components/auth/AuthContext';

export default function DocumentLibrary() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<InvestorDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Financial', 'Legal', 'Product', 'Market', 'Other'];

  useEffect(() => {
    loadDocuments();
  }, [user]);

  useEffect(() => {
    filterDocuments();
  }, [documents, selectedCategory, searchQuery]);

  async function loadDocuments() {
    try {
      setLoading(true);
      const docs = await fetchInvestorDocuments(user?.role || 'investor');
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterDocuments() {
    let filtered = documents;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredDocs(filtered);
  }

  const categoryColors: Record<string, string> = {
    Financial: 'bg-success/10 text-success border-success/20',
    Legal: 'bg-primary/10 text-primary border-primary/20',
    Product: 'bg-warning/10 text-warning border-warning/20',
    Market: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    Other: 'bg-muted',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No Documents Available</h3>
        <p className="text-muted-foreground mb-4">
          Documents will appear here once they are uploaded by the admin.
        </p>
        <p className="text-sm text-muted-foreground">
          Contact your administrator if you believe documents should be available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredDocs.length} of {documents.length} documents
      </div>

      {/* Document List */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No documents match your search criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/50 hover:bg-card hover:border-border transition-all"
            >
              <div className="flex items-center space-x-4 flex-1">
                {/* File Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                {/* Document Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{doc.title}</h3>
                    <Badge
                      variant="secondary"
                      className={categoryColors[doc.category] || categoryColors.Other}
                    >
                      {doc.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {doc.fileSize && <span>{doc.fileSize}</span>}
                    <span>•</span>
                    <span>Updated {formatDate(doc.uploadDate)}</span>
                    {doc.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex gap-1">
                          {doc.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="ml-4 flex-shrink-0"
              >
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {doc.fileType || 'Download'}
                  </span>
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
