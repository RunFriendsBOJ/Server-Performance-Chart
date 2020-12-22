#include <iostream>
#include <string>
#include <fstream>

using namespace std;
string s;
int id = 1;
void sample1(ostream &fout)
{
    fout << "{";
    fout << "\"id\":" << id++ << ",";
    fout << "\"title\":\"Hello, World!\",";
    fout << "\"content\":\"Hello Pukuba This Hawawa!\"";
    fout << "},";
    return;
}

void sample2(ostream &fout)
{
    fout << "{";
    fout << "\"id\":" << id++ << ",";
    fout << "\"title\":\"Second Post!\",";
    fout << "\"content\":\"Pukuba's Second Post...! >.<! \"";
    fout << "}";
}
int main()
{
    ofstream fout;
    fout.open("post.json");
    fout << "[";

    sample1(fout);
    sample2(fout);

    fout << "]";
    return 0;
}
